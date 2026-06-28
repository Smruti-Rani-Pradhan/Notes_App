import {
  FileText,
  Plus,
  Star,
  Trash2,
  LogOut,
  NotebookText,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "@/features/auth/authSlice";
import useNotes from "@/features/notes/hooks/useNotes";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    filters,
    notes,
    pagination,
    changeView,
    createDraft,
  } = useNotes();

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside className="hidden w-72 flex-col border-r bg-card lg:flex">

      {/* Logo */}

      <div className="border-b px-6 py-6">

        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <NotebookText size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Notes
            </h1>

            <p className="text-sm text-muted-foreground">
              Organize everything.
            </p>
          </div>
        </div>

      </div>

      {/* New Note */}

      <div className="p-5">

        <Button
          className="w-full rounded-lg"
          onClick={createDraft}
        >

          <Plus className="mr-2 h-4 w-4" />

          New Note

        </Button>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-4">

        <Button
          variant={filters.view === "notes" ? "secondary" : "ghost"}
          className="w-full justify-between rounded-lg"
          onClick={() => changeView("notes")}
        >
          <span className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />

            My Notes
          </span>

          <span className="text-xs text-muted-foreground">
            {filters.view === "notes"
              ? pagination.totalNotes
              : notes.length}
          </span>
        </Button>

        <Button
          variant={filters.view === "favorites" ? "secondary" : "ghost"}
          className="w-full justify-start rounded-lg"
          onClick={() => changeView("favorites")}
        >
          <Star className="mr-2 h-5 w-5" />

          Favorites
        </Button>

        <Button
          variant={filters.view === "trash" ? "secondary" : "ghost"}
          className="w-full justify-start rounded-lg"
          onClick={() => changeView("trash")}
        >
          <Trash2 className="mr-2 h-5 w-5" />

          Trash
        </Button>

      </nav>

      {/* Logout */}

      <div className="border-t p-5">

        <Button
          variant="destructive"
          className="w-full rounded-lg"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />

          Logout
        </Button>

      </div>

    </aside>
  );
}
