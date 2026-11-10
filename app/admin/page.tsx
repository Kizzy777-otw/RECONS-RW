import { cookies } from "next/headers";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { getAdminData } from "@/lib/adminData";

export const metadata = { title: "RECONS Admin Portal" };

function AdminDatabaseUnavailable() {
  return (
    <main className="theme-page grid min-h-screen place-items-center px-5">
      <section className="theme-surface max-w-xl rounded-2xl border p-8">
        <h1 className="text-xl font-bold">Admin database unavailable</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-300">
          Configure the server-only Supabase credentials and apply the database migration before
          using the admin portal. No demo records are being shown as live data.
        </p>
      </section>
    </main>
  );
}

export default async function AdminPage() {
  // Validate the signed cookie on the server so dashboard data is not rendered to anonymous users.
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) return <AdminLogin />;

  let data: Awaited<ReturnType<typeof getAdminData>> | null = null;
  try {
    data = await getAdminData();
  } catch (error) {
    console.error("Admin database is unavailable:", error);
  }
  if (!data) return <AdminDatabaseUnavailable />;
  return <AdminDashboard {...data} />;
}
