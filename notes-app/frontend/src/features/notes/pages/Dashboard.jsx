import MainLayout from "@/components/layout/MainLayout";

import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";

export default function Dashboard() {
  return (
    <MainLayout>
      <section className="h-[calc(100vh-7rem)]">
        <div className="grid h-full grid-cols-12 gap-6">

          {/* Left Panel - Notes List */}
          <aside className="col-span-4 rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-800">
                My Notes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                All your notes in one place.
              </p>
            </div>

            <NotesList />
          </aside>

          {/* Right Panel - Editor */}
          <section className="col-span-8 rounded-2xl border bg-white shadow-sm">
            <NoteEditor />
          </section>

        </div>
      </section>
    </MainLayout>
  );
}