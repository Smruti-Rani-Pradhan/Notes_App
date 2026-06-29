import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      <Sidebar className="hidden lg:flex w-72 border-r" />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  );
}