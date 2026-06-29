export default function NotesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-border bg-card p-4"
        >
          <div className="mb-3 h-5 w-2/3 rounded bg-muted" />

          <div className="mb-2 h-4 rounded bg-muted" />

          <div className="mb-2 h-4 w-5/6 rounded bg-muted" />

          <div className="mt-4 h-3 w-20 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}