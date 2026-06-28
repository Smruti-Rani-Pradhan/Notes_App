import NoteCard from "./NoteCard";
import EmptyState from "./EmptyState";

const demoNotes = [
  {
    id: 1,
    title: "Shopping List",
    content: "Milk, Bread, Eggs, Fruits",
    updatedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "React Notes",
    content: "Finish Redux Toolkit integration.",
    updatedAt: "Yesterday",
  },
];

export default function NotesList() {
  if (demoNotes.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="h-full overflow-y-auto space-y-4">
      {demoNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
        />
      ))}
    </section>
  );
}