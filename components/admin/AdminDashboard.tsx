"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  FileSpreadsheet,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Brand } from "@/components/Brand";
import { FarmerTable, TicketTable } from "@/components/admin/AdminTables";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Farmer, Issue, IssueStatus } from "@/types";

type AdminDashboardProps = { farmers: Farmer[]; issues: Issue[] };
type Section = "Dashboard" | "Incoming SMS Tickets" | "Farmer Directory" | "Salesforce Export/Import" | "Settings";

const navigation: { label: Section; icon: typeof LayoutDashboard }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Incoming SMS Tickets", icon: MessageSquareText },
  { label: "Farmer Directory", icon: Users },
  { label: "Salesforce Export/Import", icon: FileSpreadsheet },
  { label: "Settings", icon: Settings },
];

function statusClass(status: IssueStatus) {
  if (status === "New") return "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
  if (status === "In progress") return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
}

type NoteEntry = { text: string; createdAt: string; author: string };

export function AdminDashboard({ farmers, issues: initialIssues }: AdminDashboardProps) {
  const [section, setSection] = useState<Section>("Dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issueStatuses, setIssueStatuses] = useState<Record<string, IssueStatus>>({});
  const [notes, setNotes] = useState<Record<string, NoteEntry[]>>({
    "CTR-2026-8812": [
      { text: "Farmer orientation completed; follow-up check scheduled.", createdAt: "2026-04-12T09:20:00.000Z", author: "A. Mukamana" },
    ],
  });
  const [noteDraft, setNoteDraft] = useState("");
  const [noteFeedback, setNoteFeedback] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  // Memoize the shared search results so typing filters each relevant record set consistently.
  const filteredFarmers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return farmers;
    return farmers.filter((farmer) =>
      [farmer.name, farmer.phone, farmer.contractNumber, farmer.location].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [farmers, search]);

  const filteredIssues = useMemo(() => {
    const query = search.trim().toLowerCase();
    return initialIssues.filter((issue) => {
      const farmer = farmers.find((entry) => entry.id === issue.farmerId);
      return !query || [issue.phone, issue.message, farmer?.name ?? "", farmer?.contractNumber ?? ""]
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [farmers, initialIssues, search]);

  const newTickets = initialIssues.filter((issue) => (issueStatuses[issue.id] ?? issue.status) === "New").length;

  async function logout() {
    setSigningOut(true);
    // Clear the server cookie before navigating back to the login page.
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin");
  }

  function addNote() {
    if (!selectedIssue || !noteDraft.trim()) return;
    const farmer = farmers.find((entry) => entry.id === selectedIssue.farmerId);
    if (!farmer) return;
    // Notes are grouped by contract and kept in component state for this prototype session.
    setNotes((current) => ({
      ...current,
      [farmer.contractNumber]: [
        ...(current[farmer.contractNumber] ?? []),
        { text: noteDraft.trim(), createdAt: new Date().toISOString(), author: "You" },
      ],
    }));
    setNoteDraft("");
    setNoteFeedback("Note added to this prototype. Google Sheets is not connected, so nothing was synced.");
  }

  function changeStatus(issue: Issue, status: IssueStatus) {
    // Keep overrides separate from the sample records so the original fixture remains unchanged.
    setIssueStatuses((current) => ({ ...current, [issue.id]: status }));
  }

  const showingFarmers = section === "Farmer Directory";
  const showingTickets = section === "Incoming SMS Tickets";
  const title = showingFarmers ? "Farmer directory" : showingTickets ? "Incoming SMS tickets" : section;

  return (
    <div className="theme-page min-h-screen">
      <aside className="theme-surface fixed inset-y-0 left-0 z-20 hidden w-[255px] flex-col border-r px-5 py-6 lg:flex">
        <Brand />
        <p className="mb-3 mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">Operations</p>
        <nav className="grid gap-1" aria-label="Admin navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => setSection(label)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${section === label ? "bg-electric-pale text-navy dark:bg-electric/15 dark:text-white" : "text-slate-500 hover:bg-slate-50 hover:text-navy dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"}`}>
              <Icon size={18} className={section === label ? "text-electric-dark" : ""} />
              {label}
              {label === "Incoming SMS Tickets" && newTickets > 0 && <span className="ml-auto rounded-full bg-electric px-2 py-0.5 text-[10px] text-navy">{newTickets}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-navy p-4 text-white">
          <div className="flex items-center gap-2"><CircleHelp size={17} className="text-electric" /><span className="text-sm font-bold">Need a hand?</span></div>
          <p className="mt-2 text-xs leading-5 text-white/55">Contact your system administrator for support.</p>
        </div>
      </aside>

      <div className="lg:pl-[255px]">
        <header className="theme-surface sticky top-0 z-10 flex h-[72px] items-center justify-between border-b px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileNavOpen((open) => !open)} className="text-slate-500 lg:hidden" aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileNavOpen}>
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div><p className="text-[11px] text-slate-400">RECONS / {section}</p><p className="mt-0.5 text-sm font-bold">{title}</p></div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="hidden text-xs text-slate-400 sm:inline">Internal team workspace</span>
            <button aria-label="Notifications" className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"><Bell size={19} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-electric-dark" /></button>
            <span className="grid size-9 place-items-center rounded-full bg-navy text-xs font-bold text-white">RT</span>
            <button onClick={logout} disabled={signingOut} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy"><LogOut size={17} /><span className="hidden sm:inline">{signingOut ? "Signing out" : "Sign out"}</span></button>
          </div>
        </header>
        {mobileNavOpen && (
          <nav className="theme-surface grid gap-1 border-b p-3 lg:hidden" aria-label="Mobile admin navigation">
            {navigation.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => { setSection(label); setMobileNavOpen(false); }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${section === label ? "bg-electric-pale text-navy dark:bg-electric/15 dark:text-white" : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}>
                <Icon size={18} />{label}
              </button>
            ))}
          </nav>
        )}

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-slate-500">Your support activity at a glance.</p>
              <h1 className="mt-1 text-2xl font-bold text-navy dark:text-white">{section === "Dashboard" ? "Good morning, RECONS team" : title}</h1>
            </div>
            {(showingFarmers || showingTickets) && (
              <label className="relative block w-full sm:w-[320px]">
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search phone, name or contract..." className="theme-surface w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none focus:border-electric" />
              </label>
            )}
          </div>

          {section === "Dashboard" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: "Open tickets", value: String(newTickets).padStart(2, "0"), trend: "Needs attention", icon: MessageSquareText },
                  { title: "Farmers supported", value: "1,204", trend: "+8.2% this month", icon: Users },
                  { title: "Active contracts", value: "986", trend: "Across 5 districts", icon: FileSpreadsheet },
                  { title: "Avg. response time", value: "2.4h", trend: "↓ 18% this month", icon: Activity },
                ].map(({ title: cardTitle, value, trend, icon: Icon }) => (
                  <article key={cardTitle} className="theme-surface rounded-2xl border p-5">
                    <div className="flex justify-between"><span className="text-sm text-slate-500">{cardTitle}</span><span className="grid size-9 place-items-center rounded-xl bg-electric-pale text-electric-dark"><Icon size={18} /></span></div>
                    <p className="mt-5 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-400">{trend}</p>
                  </article>
                ))}
              </div>
              <div className="theme-surface mt-7 rounded-2xl border">
                <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-700">
                  <div><h2 className="font-bold">Latest farmer messages</h2><p className="mt-1 text-xs text-slate-400">Sample support requests · preview ticket actions.</p></div>
                  <button onClick={() => setSection("Incoming SMS Tickets")} className="inline-flex items-center gap-1 text-xs font-bold text-electric-dark">All tickets <ChevronRight size={15} /></button>
                </div>
                <TicketTable issues={initialIssues.slice(0, 3)} farmers={farmers} statuses={issueStatuses} openTicket={setSelectedIssue} changeStatus={changeStatus} />
              </div>
              <section className="theme-surface mt-5 rounded-2xl border p-5">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-sm font-bold">Support flow preview</h2>
                    <p className="mt-1 text-xs text-slate-400">Prototype workflow · no provider or spreadsheet is connected.</p>
                  </div>
                  <span className="w-fit rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-950 dark:text-amber-300">Demo mode</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    { step: "01", label: "Farmer message", detail: "Sample SMS received", icon: MessageSquareText },
                    { step: "02", label: "RECONS support", detail: `${newTickets} tickets need review`, icon: Users },
                    { step: "03", label: "Contract follow-up", detail: "Notes remain in this session", icon: FileSpreadsheet },
                  ].map(({ step, label, detail, icon: Icon }) => (
                    <article key={step} className="theme-soft flex items-start gap-3 rounded-xl p-4">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-electric-pale text-electric-dark dark:bg-electric/15 dark:text-electric"><Icon size={17} /></span>
                      <div><p className="text-[10px] font-mono text-slate-400">{step}</p><h3 className="mt-1 text-xs font-bold">{label}</h3><p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{detail}</p></div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}

          {showingTickets && (
            <div className="theme-surface overflow-hidden rounded-2xl border">
              <div className="border-b border-slate-100 p-5 dark:border-slate-700"><h2 className="font-bold">Support inbox <span className="ml-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800">{filteredIssues.length}</span></h2><p className="mt-1 text-xs text-slate-400">Sample SMS tickets · connect a provider to receive live requests.</p></div>
              <TicketTable issues={filteredIssues} farmers={farmers} statuses={issueStatuses} openTicket={setSelectedIssue} changeStatus={changeStatus} />
            </div>
          )}

          {showingFarmers && (
            <FarmerTable farmers={filteredFarmers} />
          )}

          {section === "Salesforce Export/Import" && (
            <section className="theme-surface max-w-2xl rounded-2xl border p-7">
              <div className="grid size-12 place-items-center rounded-xl bg-electric-pale text-electric-dark dark:bg-electric/15 dark:text-electric"><FileSpreadsheet size={23} /></div>
              <h2 className="mt-5 text-xl font-bold">Salesforce data exchange</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">Connect a Salesforce integration and Google Sheets data adapter to enable validated imports and exports. This prototype currently uses sample records.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button disabled className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white opacity-50"><ArrowDownToLine size={17} /> Export farmers</button>
                <button disabled className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-400"><ArrowUpRight size={17} /> Import records</button>
              </div>
              <p className="mt-4 text-xs text-slate-400">Actions stay disabled until a data source is configured.</p>
            </section>
          )}

          {section === "Settings" && <section className="theme-surface max-w-2xl rounded-2xl border p-7"><div className="grid size-12 place-items-center rounded-xl bg-electric-pale text-electric-dark dark:bg-electric/15 dark:text-electric"><Settings size={23} /></div><h2 className="mt-5 text-xl font-bold">Workspace settings</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">Admin access is configured with the server-side <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">ADMIN_PASSWORD</code> and <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">ADMIN_SESSION_SECRET</code> environment variables.</p><p className="mt-4 text-xs text-slate-400">Use individual identity-provider accounts for production team access and audit trails.</p></section>}
        </main>
      </div>

      {selectedIssue && (
        <div className="fixed inset-0 z-30 flex justify-end bg-navy/40" onClick={(event) => { if (event.target === event.currentTarget) setSelectedIssue(null); }}>
          <aside role="dialog" aria-modal="true" aria-label="Farmer support details" className="theme-surface h-full w-full max-w-xl overflow-y-auto p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-electric-dark">Support case · {selectedIssue.id}</p><h2 className="mt-2 text-2xl font-bold">Farmer details</h2></div><button onClick={() => setSelectedIssue(null)} aria-label="Close detail view" className="rounded-full p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button></div>
            {(() => {
              const farmer = farmers.find((entry) => entry.id === selectedIssue.farmerId);
              if (!farmer) return <p className="mt-8 text-sm text-slate-500">No farmer record is linked to this message.</p>;
              return (
                <>
                  <div className="theme-soft mt-7 rounded-2xl p-5">
                    <p className="text-lg font-bold">{farmer.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{farmer.phone}</p>
                    <div className="mt-5 grid grid-cols-2 gap-y-4 text-sm"><div><p className="text-xs text-slate-400">Contract number</p><p className="mt-1 font-mono font-semibold">{farmer.contractNumber}</p></div><div><p className="text-xs text-slate-400">HomeBiogas model</p><p className="mt-1 font-semibold">{farmer.model}</p></div><div className="col-span-2"><p className="text-xs text-slate-400">Location</p><p className="mt-1 font-semibold">{farmer.location}</p></div></div>
                  </div>
                  <div className="mt-7"><div className="flex items-center justify-between"><h3 className="font-bold">Reported issue</h3><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(issueStatuses[selectedIssue.id] ?? selectedIssue.status)}`}>{issueStatuses[selectedIssue.id] ?? selectedIssue.status}</span></div><p className="mt-3 rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600">{selectedIssue.message}</p><p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">{new Date(selectedIssue.receivedAt).toLocaleString("en-RW")}</p></div>
                  <div className="mt-7">
                    <h3 className="font-bold">Contract note history</h3>
                    <p className="mt-1 font-mono text-xs text-slate-400">{farmer.contractNumber}</p>
                    <div className="mt-4 grid gap-3">
                      {(notes[farmer.contractNumber] ?? []).map((note, index) => (
                        <article key={`${note.createdAt}-${index}`} className="relative rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                          <span className="absolute bottom-0 left-0 top-0 w-1 rounded-l-xl bg-electric" />
                          <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{note.text}</p>
                          <p className="mt-3 text-[11px] text-slate-400">{note.author} · {new Date(note.createdAt).toLocaleString("en-RW")}</p>
                        </article>
                      ))}
                      {!(notes[farmer.contractNumber]?.length) && <p className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-400 dark:border-slate-700">No notes logged in this demo session yet.</p>}
                    </div>
                    <textarea value={noteDraft} onChange={(event) => { setNoteDraft(event.target.value); setNoteFeedback(""); }} rows={3} placeholder="Add a resolution note for this contract..." className="theme-surface mt-4 w-full rounded-xl border p-3 text-sm outline-none focus:border-electric" />
                    <button onClick={addNote} disabled={!noteDraft.trim()} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-electric px-4 py-3 text-sm font-bold text-navy transition hover:bg-[#75ef00] disabled:opacity-40"><Check size={16} /> Save Note &amp; Sync Google Sheets</button>
                    {noteFeedback && <p role="status" className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:bg-amber-950 dark:text-amber-200">{noteFeedback}</p>}
                    {!noteFeedback && <p className="mt-2 text-xs leading-5 text-slate-400">Prototype preview only: notes are in memory and Google Sheets is not connected.</p>}
                  </div>
                </>
              );
            })()}
          </aside>
        </div>
      )}
    </div>
  );
}
