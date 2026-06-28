import { useEffect } from "react";

import MainLayout from "@/components/layout/MainLayout";

import NotesToolbar from "../components/NotesToolbar";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";

import useNotes from "../hooks/useNotes";

export default function Dashboard() {
  const { filters, loadNotes, selectedNote } = useNotes();

  useEffect(() => {
    loadNotes();
  }, [loadNotes, filters.search, filters.sort, filters.view, filters.tag]);

  return (
    <MainLayout>
      <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-12">

        {/* Left Panel - Notes List */}
        <aside className={`flex min-h-0 flex-col rounded-2xl border bg-card shadow-md shadow-black/5 lg:col-span-4 transition-all duration-300 ${
          selectedNote ? "hidden lg:flex" : "flex"
        }`}>
          <div className="border-b border-muted/15 p-5 bg-muted/5 rounded-t-2xl">
            <NotesToolbar />
          </div>

          <div className="min-h-0 flex-1 overflow-hidden p-4">
            <NotesList />
          </div>
        </aside>

        {/* Right Panel - Note Editor */}
        <section className={`min-h-0 overflow-hidden rounded-2xl border bg-card shadow-md shadow-black/5 lg:col-span-8 transition-all duration-300 ${
          !selectedNote ? "hidden lg:block" : "block"
        }`}>
          <NoteEditor />
        </section>

      </div>
    </MainLayout>
  );
}
