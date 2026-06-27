import { Card, CardContent } from "@/components/ui/card";

export default function AuthCard({ children }) {
  return (
    <Card className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur">
      <CardContent className="p-8 md:p-10">
        {children}
      </CardContent>
    </Card>
  );
}