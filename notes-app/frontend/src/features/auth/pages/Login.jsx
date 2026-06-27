import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </main>
  );
}