import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import useNotes from "@/features/notes/hooks/useNotes";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { filters, searchNotes } = useNotes();

  const titleByView = {
    notes: "My Notes",
    favorites: "Favorites",
    trash: "Trash",
  };

  return (
    <header className="flex h-20 items-center justify-between border-b bg-card px-5 lg:px-8">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {titleByView[filters.view] || "My Notes"}
        </h1>

        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      {/* Center */}

      <div className="relative hidden w-full max-w-md lg:block">

        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <Input
          value={filters.search}
          onChange={(event) => searchNotes(event.target.value)}
          placeholder="Search notes..."
          className="pl-10"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <Avatar className="h-10 w-10">
          <AvatarFallback>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

      </div>

    </header>
  );
}
