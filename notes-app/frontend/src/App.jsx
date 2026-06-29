import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { checkSession } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(checkSession());
    }
  }, [dispatch, initialized]);

  if (!initialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm font-semibold text-muted-foreground/90 animate-pulse">Initializing session...</p>
        </div>
      </div>
    );
  }

  return <AppRouter />;
}