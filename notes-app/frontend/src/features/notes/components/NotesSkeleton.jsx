export default function NotesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="mb-3 h-5 w-2/3 rounded bg-slate-200" />

          <div className="mb-2 h-4 rounded bg-slate-200" />

          <div className="mb-2 h-4 w-5/6 rounded bg-slate-200" />

          <div className="mt-4 h-3 w-20 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}