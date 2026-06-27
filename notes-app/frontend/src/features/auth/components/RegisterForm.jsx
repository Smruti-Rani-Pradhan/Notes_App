import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { register as registerUserThunk } from "../authSlice";
import { registerSchema } from "../schemas/register.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
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
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    if (loading) return;

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const result = await dispatch(registerUserThunk(payload));

    if (registerUserThunk.fulfilled.match(result)) {
      toast.success("Registration successful. Please login.");
      navigate("/login", { replace: true });
    } else {
      toast.error(result.payload || "Registration failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="text-muted-foreground">
          Start organizing your notes today
        </p>
      </div>

      <div className="space-y-4">

        <div>
          <Input
            placeholder="Full Name"
            autoComplete="name"
            {...register("name")}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

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
            autoComplete="new-password"
            {...register("password")}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}