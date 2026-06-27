import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}