import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) redirect("/admin");
  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />
      <div className="flex-1 px-6 md:px-10 py-8 max-w-full overflow-x-hidden">{children}</div>
    </div>
  );
}
