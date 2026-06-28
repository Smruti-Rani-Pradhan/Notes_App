import {
  FileText,
  Heart,
  Home,
  LogOut,
  Plus,
  Settings,
  Trash2,
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
      navigate("/login");
    }
  };

  return (
    <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col">

      <div className="p-5">
        <Button className="w-full rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-2">

        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl"
        >
          <Home className="mr-3 h-4 w-4" />
          Dashboard
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl"
        >
          <FileText className="mr-3 h-4 w-4" />
          All Notes
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl"
        >
          <Heart className="mr-3 h-4 w-4" />
          Favorites
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl"
        >
          <Trash2 className="mr-3 h-4 w-4" />
          Trash
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl"
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>

      </nav>

      <div className="border-t p-4">

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