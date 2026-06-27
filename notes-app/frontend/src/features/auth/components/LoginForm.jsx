import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { login } from "../authSlice";
import { loginSchema } from "../schemas/login.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    if (loading) return;

    const resultAction = await dispatch(login(data));

    if (login.fulfilled.match(resultAction)) {
      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(resultAction.payload || "Login failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="text-muted-foreground">
          Sign in to continue to Notes App
        </p>
      </div>

      <div className="space-y-4">

        <div>
          <Input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password")}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}