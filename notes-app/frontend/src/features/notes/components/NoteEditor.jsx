import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NoteEditor() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-8">

      <Input
        placeholder="Note title..."
        className="mb-6 border-none px-0 text-3xl font-bold shadow-none focus-visible:ring-0"
      />

      <Textarea
        placeholder="Start writing your note..."
        className="flex-1 resize-none border-none px-0 text-base shadow-none focus-visible:ring-0"
      />

    </div>
  );
}