import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character."
    ),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password."),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});