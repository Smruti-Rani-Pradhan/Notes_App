import { useEffect } from "react";

import MainLayout from "@/components/layout/MainLayout";

import NotesToolbar from "../components/NotesToolbar";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";

import useNotes from "../hooks/useNotes";

export default function Dashboard() {
  const { filters, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, [loadNotes, filters.search, filters.sort, filters.view]);

  return (
    <MainLayout>
      <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-12">

        {/* Left Panel */}

        <aside className="flex min-h-0 flex-col rounded-lg border bg-card shadow-sm lg:col-span-4">

          <div className="border-b p-5">
            <NotesToolbar />
          </div>

          <div className="min-h-0 flex-1 overflow-hidden p-4">
            <NotesList />
          </div>

        </aside>

        {/* Right Panel */}

        <section className="min-h-0 overflow-hidden rounded-lg border bg-card shadow-sm lg:col-span-8">

          <NoteEditor />

        </section>

      </div>
    </MainLayout>
  );
}
