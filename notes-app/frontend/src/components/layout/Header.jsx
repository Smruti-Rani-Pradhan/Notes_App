import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
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
          placeholder="Search notes..."
          className="pl-10"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="rounded-full p-2 transition hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <Avatar className="h-10 w-10">
          <AvatarFallback>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

      </div>

    </header>
  );
}