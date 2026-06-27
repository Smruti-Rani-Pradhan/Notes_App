import {
  FileText,
  Plus,
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
      navigate("/login");
    }

  };

  return (
    <aside className="w-64 bg-white border-r flex flex-col">

      <div className="p-4">
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
        >
          <FileText className="mr-2 h-4 w-4" />
          My Notes
        </Button>
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

    </aside>
  );
}