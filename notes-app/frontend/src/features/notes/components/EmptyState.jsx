import { FileText, Search, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  view = "notes",
  hasSearch = false,
  onCreate,
}) {
  const state = hasSearch
    ? {
        icon: Search,
        title: "No matches found",
        description: "Try a different keyword or clear the search field.",
      }
    : {
        notes: {
          icon: FileText,
          title: "No Notes Yet",
          description:
            "Create your first note to start organizing ideas, tasks, and important information.",
        },
        favorites: {
          icon: Star,
          title: "No Favorites Yet",
          description:
            "Mark important notes as favorites and they will appear here.",
        },
        trash: {
          icon: Trash2,
          title: "Trash Is Empty",
          description:
            "Deleted notes move here first, so you can restore them later.",
        },
      }[view];

  const Icon = state.icon;

  return (
    <div className="flex h-[80%] flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/15 p-8 text-center max-w-lg mx-auto w-full transition-all duration-300">

      <div className="rounded-2xl bg-card border p-4 shadow-xs">
        <Icon
          size={38}
          className="text-muted-foreground/80"
        />
      </div>

      <h2 className="mt-6 text-xl font-bold tracking-tight text-foreground">
        {state.title}
      </h2>

      <p className="mt-2 max-w-xs text-xs font-semibold leading-relaxed text-muted-foreground/80">
        {state.description}
      </p>

      {view === "notes" && !hasSearch && (
        <Button
          className="mt-6 rounded-xl px-5 font-bold shadow-md shadow-primary/10 hover:scale-102 active:scale-98 transition-transform cursor-pointer"
          onClick={onCreate}
        >
          Create First Note
        </Button>
      )}

    </div>
  );
}
