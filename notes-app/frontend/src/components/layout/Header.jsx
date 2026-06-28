import { useEffect, useRef, useState } from "react";
import { Search, Sun, Moon, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import useNotes from "@/features/notes/hooks/useNotes";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { filters, searchNotes } = useNotes();
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      navigate("/login", { replace: true });
    }
  };

  // Theme state & persistence
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const titleByView = {
    notes: "My Notes",
    favorites: "Favorites",
    trash: "Trash",
  };

  const viewTitle = filters.tag 
    ? `Tag: #${filters.tag}` 
    : (titleByView[filters.view] || "My Notes");

  return (
    <header className="flex h-20 items-center justify-between border-b bg-card/85 backdrop-blur-md px-5 lg:px-8 sticky top-0 z-40">
      
      {/* Left (Mobile Drawer trigger & Title) */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl cursor-pointer">
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 border-r bg-card" showCloseButton={false}>
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-foreground tracking-tight sm:text-2xl transition-all">
            {viewTitle}
          </h1>
          <p className="hidden sm:block text-xs font-semibold text-muted-foreground/80 mt-0.5">
            Welcome back, {user?.name || "User"}
          </p>
        </div>
      </div>

      {/* Center Search (with Ctrl + K helper) */}
      <div className="relative hidden w-full max-w-sm md:block mx-4">
        <Search
          className="absolute left-3.5 top-3 text-muted-foreground/60"
          size={16}
        />
        <Input
          ref={searchInputRef}
          value={filters.search}
          onChange={(event) => searchNotes(event.target.value)}
          placeholder="Search notes..."
          className="pl-10 pr-12 rounded-xl bg-muted/40 border-muted focus-visible:bg-background focus-visible:ring-primary/80 transition-all font-medium placeholder:text-muted-foreground/45"
        />
        <kbd className="absolute right-3 top-3 inline-flex h-5 select-none items-center gap-0.5 rounded border border-muted-foreground/20 bg-muted px-1.5 font-mono text-[9px] font-bold text-muted-foreground/80">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </div>

      {/* Right Tools (Theme Toggle, Search for Mobile, Avatar) */}
      <div className="flex items-center gap-3">
        
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          className="rounded-xl cursor-pointer hover:bg-muted/80"
        >
          {theme === "light" ? (
            <Moon size={19} className="text-muted-foreground/85" />
          ) : (
            <Sun size={19} className="text-amber-400" />
          )}
        </Button>

        {/* User Info Avatar Dropdown */}
        <div className="flex items-center gap-3 border-l pl-3 border-muted/20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 cursor-pointer focus:outline-none hover:opacity-85 transition-opacity">
                <Avatar className="h-9 w-9 rounded-xl border border-muted-foreground/15 shadow-sm">
                  <AvatarFallback className="font-bold text-sm bg-primary/15 text-primary rounded-xl">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:block text-sm font-bold text-foreground">
                  {user?.name || "User"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl">
              <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground/75 uppercase px-3 py-2">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer font-medium rounded-lg px-3 py-2"
              >
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="cursor-pointer font-medium rounded-lg px-3 py-2"
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer font-medium text-destructive focus:bg-destructive/10 focus:text-destructive rounded-lg px-3 py-2"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>

    </header>
  );
}
