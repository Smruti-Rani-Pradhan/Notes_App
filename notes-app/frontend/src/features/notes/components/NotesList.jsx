import NoteCard from "./NoteCard";
import EmptyState from "./EmptyState";

const notes = [
  {
    id: 1,
    title: "Shopping List",
    content: "Milk, Eggs, Bread, Butter",
    updatedAt: "2 min ago",
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Complete frontend authentication.",
    updatedAt: "1 hour ago",
  },
  {
    id: 3,
    title: "Project Ideas",
    content: "Realtime collaboration using Socket.io",
    updatedAt: "Yesterday",
  },
];

export default function NotesList() {
  if (!notes.length) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4 overflow-y-auto">

      {notes.map((note, index) => (
        <NoteCard
          key={note.id}
          note={note}
          active={index === 0}
        />
      ))}

    </div>
  );
}