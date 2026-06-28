import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function NoteEditor() {
  return (
    <section className="flex h-full flex-col rounded-xl bg-white p-6 shadow">

      <Input
        placeholder="Note title..."
        className="mb-4 text-2xl font-semibold border-none shadow-none px-0"
      />

      <Textarea
        placeholder="Start writing..."
        className="flex-1 resize-none border-none shadow-none"
      />

    </section>
  );
}