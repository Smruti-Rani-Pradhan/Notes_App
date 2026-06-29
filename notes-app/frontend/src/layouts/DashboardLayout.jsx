import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <Outlet />
    </main>
  );
}