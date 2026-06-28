import {
  FileText,
  Plus,
  Star,
  Trash2,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "@/features/auth/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside className="flex w-72 flex-col border-r bg-white">

      {/* Logo */}

      <div className="border-b px-6 py-6">

        <h1 className="text-3xl font-bold text-blue-600">
          Notes
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Organize everything.
        </p>

      </div>

      {/* New Note */}

      <div className="p-5">

        <Button className="w-full rounded-xl">

          <Plus className="mr-2 h-4 w-4" />

          New Note

        </Button>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-4">

        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl"
        >
          <FileText className="mr-2 h-5 w-5" />

          My Notes
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl"
        >
          <Star className="mr-2 h-5 w-5" />

          Favorites
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl"
        >
          <Trash2 className="mr-2 h-5 w-5" />

          Trash
        </Button>

      </nav>

      {/* Logout */}

      <div className="border-t p-5">

        <Button
          variant="destructive"
          className="w-full rounded-xl"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />

          Logout
        </Button>

      </div>

    </aside>
  );
}