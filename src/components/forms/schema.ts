import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name is required."),
    email: z.email("Invalid email address."),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters long.")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
      ),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be atleast 6 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export const signInSchema = z.object({
  email: z.email("Invalid email address."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters long.")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
});
