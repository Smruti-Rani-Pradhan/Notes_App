import AuthCard from "../components/AuthCard";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </main>
  );
}