import {
  Plus,
  Search,
  ArrowDownAZ,
  Trash2,
  Star,
  FileText,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useNotes from "../hooks/useNotes";

export default function NotesToolbar() {
  const {
    filters,
    pagination,
    searchNotes,
    sortNotes,
    createDraft,
  } = useNotes();

  const viewMeta = {
    notes: {
      icon: FileText,
      label: "All notes",
    },
    favorites: {
      icon: Star,
      label: "Favorites",
    },
    trash: {
      icon: Trash2,
      label: "Trash",
    },
  };

  const ActiveIcon = viewMeta[filters.view]?.icon || FileText;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ActiveIcon size={16} />
          <span>{viewMeta[filters.view]?.label || "All notes"}</span>
        </div>

        <span className="text-xs text-muted-foreground">
          {pagination.totalNotes} total
        </span>
      </div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <Input
          value={filters.search}
          onChange={(e) =>
            searchNotes(e.target.value)
          }
          placeholder="Search notes..."
          className="pl-10"
        />

      </div>

      {/* Sort */}

      <Select
        value={filters.sort}
        onValueChange={sortNotes}
      >
        <SelectTrigger>

          <ArrowDownAZ
            className="mr-2"
            size={16}
          />

          <SelectValue />

        </SelectTrigger>

        <SelectContent>

          <SelectItem value="-createdAt">
            Newest First
          </SelectItem>

          <SelectItem value="createdAt">
            Oldest First
          </SelectItem>

          <SelectItem value="title">
            Title A-Z
          </SelectItem>

          <SelectItem value="-title">
            Title Z-A
          </SelectItem>

        </SelectContent>

      </Select>

      {/* New Note */}

      <Button
        className="w-full"
        onClick={createDraft}
        disabled={filters.view === "trash"}
      >
        <Plus className="mr-2 h-4 w-4" />

        New Note

      </Button>

    </div>
  );
}
