import { Bell, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 h-16 bg-white/90 backdrop-blur border-b border-slate-200 px-6 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg shadow">
          N
        </div>

        <div>
          <h1 className="font-bold text-lg text-slate-800">
            Notes App
          </h1>

          <p className="text-xs text-slate-500">
            Organize your ideas
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex relative w-full max-w-lg mx-8">
        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <Input
          placeholder="Search notes..."
          className="pl-10 rounded-xl"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <Button size="sm" className="hidden md:flex">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>

        <Button
          size="icon"
          variant="ghost"
        >
          <Bell size={20} />
        </Button>

        <div className="flex items-center gap-3">

          <Avatar>
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email || ""}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}