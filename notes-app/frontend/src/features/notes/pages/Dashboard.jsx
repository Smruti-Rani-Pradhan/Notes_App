import { useEffect } from "react";

import MainLayout from "@/components/layout/MainLayout";

import NotesToolbar from "../components/NotesToolbar";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";

import useNotes from "../hooks/useNotes";

export default function Dashboard() {
  const { loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <MainLayout>
      <div className="grid h-full grid-cols-12 gap-6">

        {/* Left Panel */}

        <aside className="col-span-4 flex h-full flex-col rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-5">
            <NotesToolbar />
          </div>

          <div className="flex-1 overflow-hidden p-5">
            <NotesList />
          </div>

        </aside>

        {/* Right Panel */}

        <section className="col-span-8 h-full overflow-hidden rounded-2xl border bg-white shadow-sm">

          <NoteEditor />

        </section>

      </div>
    </MainLayout>
  );
}