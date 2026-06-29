import {
  FileText,
  Plus,
  Star,
  Trash2,
  LogOut,
  NotebookText,
  Hash,
  ChevronRight,
  Settings as SettingsIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { logout } from "@/features/auth/authSlice";
import useNotes from "@/features/notes/hooks/useNotes";

export default function Sidebar({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    filters,
    notes,
    pagination,
    changeView,
    changeTag,
    createDraft,
  } = useNotes();

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      navigate("/login", { replace: true });
    }
  };

  // Dynamically extract all unique tags from notes
  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.tags || []))
  ).filter(Boolean);

  return (
    <aside className={`flex h-full flex-col bg-card ${className}`}>
      
      {/* Logo */}
      <div className="border-b px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
            <NotebookText size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Notes
            </h1>
            <p className="text-xs font-semibold text-muted-foreground/80">
              Organize everything.
            </p>
          </div>
        </div>
      </div>

      {/* New Note Button */}
      <div className="p-5">
        <Button
          className="w-full rounded-xl py-5 font-semibold shadow-md shadow-primary/10 hover:shadow-lg transition-all hover:scale-102 cursor-pointer"
          onClick={createDraft}
          disabled={filters.view === "trash"}
        >
          <Plus className="mr-2 h-4.5 w-4.5" />
          New Note
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-4 overflow-y-auto">
        <Button
          variant={filters.view === "notes" && !filters.tag ? "secondary" : "ghost"}
          className="w-full justify-between rounded-xl font-semibold py-5 cursor-pointer hover:bg-muted/80"
          onClick={() => {
            changeView("notes");
            changeTag("");
          }}
        >
          <span className="flex items-center">
            <FileText className="mr-3 h-5 w-5 text-muted-foreground/80" />
            My Notes
          </span>

          <span className="text-xs bg-muted-foreground/10 px-2 py-0.5 rounded-full text-foreground/80 font-bold">
            {filters.view === "notes" ? pagination.totalNotes : notes.length}
          </span>
        </Button>

        <Button
          variant={filters.view === "favorites" ? "secondary" : "ghost"}
          className="w-full justify-start rounded-xl font-semibold py-5 cursor-pointer hover:bg-muted/80"
          onClick={() => {
            changeView("favorites");
            changeTag("");
          }}
        >
          <Star className="mr-3 h-5 w-5 text-amber-500 fill-amber-500/10" />
          Favorites
        </Button>

        <Button
          variant={filters.view === "trash" ? "secondary" : "ghost"}
          className="w-full justify-start rounded-xl font-semibold py-5 cursor-pointer hover:bg-muted/80"
          onClick={() => {
            changeView("trash");
            changeTag("");
          }}
        >
          <Trash2 className="mr-3 h-5 w-5 text-destructive/80" />
          Trash
        </Button>

        <Button
          variant={location.pathname === "/settings" ? "secondary" : "ghost"}
          className="w-full justify-start rounded-xl font-semibold py-5 cursor-pointer hover:bg-muted/80"
          onClick={() => navigate("/settings")}
        >
          <SettingsIcon className="mr-3 h-5 w-5 text-muted-foreground/80" />
          Settings
        </Button>

        {/* Tags Section */}
        {allTags.length > 0 && (
          <div className="pt-6">
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/75">
                Tags
              </span>
            </div>

            <div className="space-y-1">
              {allTags.map((tag) => {
                const isActive = filters.tag === tag;
                return (
                  <Button
                    key={tag}
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-between rounded-xl font-medium py-4 text-sm cursor-pointer hover:bg-muted/80"
                    onClick={() => {
                      changeTag(isActive ? "" : tag);
                      changeView("notes");
                    }}
                  >
                    <span className="flex items-center truncate">
                      <Hash className={`mr-2.5 h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground/60"}`} />
                      <span className="truncate">#{tag}</span>
                    </span>
                    <ChevronRight size={12} className={`opacity-40 transition-transform ${isActive ? "rotate-90 text-primary opacity-100" : ""}`} />
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="border-t p-5">
        <Button
          variant="destructive"
          className="w-full rounded-xl font-semibold shadow-sm cursor-pointer hover:shadow hover:scale-102 transition-all"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

    </aside>
  );
}
