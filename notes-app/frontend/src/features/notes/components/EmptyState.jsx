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
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40 p-8 text-center">

      <div className="rounded-full bg-background p-5 shadow-sm">
        <Icon
          size={42}
          className="text-muted-foreground"
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-foreground">
        {state.title}
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        {state.description}
      </p>

      {view === "notes" && !hasSearch && (
        <Button
          className="mt-8"
          onClick={onCreate}
        >
          Create First Note
        </Button>
      )}

    </div>
  );
}
