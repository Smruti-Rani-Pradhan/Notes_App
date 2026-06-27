import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <h1 className="text-2xl font-bold">
        Notes App
      </h1>

      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <Input
          placeholder="Search notes..."
          className="pl-10"
        />

      </div>

      <Avatar>

        <AvatarFallback>
          U
        </AvatarFallback>

      </Avatar>

    </header>
  );
}