import { ChevronRight } from "lucide-react";
import type { Farmer, Issue, IssueStatus } from "@/types";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-RW", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}

function statusClass(status: IssueStatus) {
  if (status === "New") return "bg-amber-50 text-amber-700";
  if (status === "In progress") return "bg-blue-50 text-blue-700";
  return "bg-emerald-50 text-emerald-700";
}

export function TicketTable({
  issues,
  farmers,
  statuses,
  openTicket,
  changeStatus,
}: {
  issues: Issue[];
  farmers: Farmer[];
  statuses: Record<string, IssueStatus>;
  openTicket: (issue: Issue) => void;
  changeStatus: (issue: Issue, status: IssueStatus) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-navy dark:text-slate-400">
          <tr>
            <th className="px-5 py-3.5 font-semibold">Farmer / phone</th>
            <th className="px-5 py-3.5 font-semibold">Issue</th>
            <th className="px-5 py-3.5 font-semibold">Received</th>
            <th className="px-5 py-3.5 font-semibold">Status</th>
            <th className="px-5 py-3.5" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {issues.map((issue) => {
            const farmer = farmers.find((entry) => entry.id === issue.farmerId);
            const status = statuses[issue.id] ?? issue.status;
            return (
              <tr key={issue.id} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40" onClick={() => openTicket(issue)}>
                <td className="px-5 py-4">
                  <p className="font-semibold">{farmer?.name ?? "Unknown farmer"}</p>
                  <p className="mt-1 text-xs text-slate-400">{issue.phone}</p>
                  <p className="mt-1 font-mono text-[10px] text-slate-400">{farmer?.contractNumber}</p>
                </td>
                <td className="max-w-[280px] truncate px-5 py-4 text-slate-500 dark:text-slate-300">{issue.message}</td>
                <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{formatDate(issue.receivedAt)}</td>
                <td className="px-5 py-4" onClick={(event) => event.stopPropagation()}>
                  <select
                    value={status}
                    onChange={(event) => changeStatus(issue, event.target.value as IssueStatus)}
                    aria-label={`Status for ${issue.id}`}
                    className={`rounded-full border-0 px-2.5 py-1.5 text-xs font-semibold outline-none ${statusClass(status)}`}
                  >
                    <option>New</option>
                    <option>In progress</option>
                    <option>Resolved</option>
                  </select>
                </td>
                <td className="px-5 py-4 text-slate-300"><ChevronRight size={17} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {issues.length === 0 && <p className="p-8 text-center text-sm text-slate-400">No tickets match your search.</p>}
    </div>
  );
}

export function FarmerTable({ farmers }: { farmers: Farmer[] }) {
  return (
    <div className="theme-surface overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-navy dark:text-slate-400">
          <tr>
            <th className="px-5 py-4 font-semibold">Farmer</th>
            <th className="px-5 py-4 font-semibold">Phone number</th>
            <th className="px-5 py-4 font-semibold">Contract number</th>
            <th className="px-5 py-4 font-semibold">Model</th>
            <th className="px-5 py-4 font-semibold">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {farmers.map((farmer) => (
            <tr key={farmer.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <td className="px-5 py-4 font-semibold">{farmer.name}</td>
              <td className="px-5 py-4 text-slate-500 dark:text-slate-300">{farmer.phone}</td>
              <td className="px-5 py-4 font-mono text-xs">{farmer.contractNumber}</td>
              <td className="px-5 py-4">{farmer.model}</td>
              <td className="px-5 py-4 text-slate-500 dark:text-slate-300">{farmer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {farmers.length === 0 && <p className="p-8 text-center text-sm text-slate-400">No farmers match that search.</p>}
    </div>
  );
}
