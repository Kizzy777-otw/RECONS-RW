import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { farmers, issues } from "@/lib/mockData";

export const metadata = { title: "RECONS Admin Portal" };

export default function AdminPage() {
  // Validate the signed cookie on the server so dashboard data is not rendered to anonymous users.
  const session = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) return <AdminLogin />;
  return <AdminDashboard farmers={farmers} issues={issues} />;
}
