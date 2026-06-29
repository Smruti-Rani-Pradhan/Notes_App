import { Card, CardContent } from "@/components/ui/card";

export default function AuthCard({ children }) {
  return (
    <Card className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 shadow-2xl backdrop-blur transition-all duration-300">
      <CardContent className="p-8 md:p-10">
        {children}
      </CardContent>
    </Card>
  );
}