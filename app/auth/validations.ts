import { z } from "zod"

const password = z.string().min(10).max(100)

export const Signup = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password,
  role: z.string(),
  company: z.string(),
})

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const Support = z.object({
  name: z.optional(z.string()),
  subject: z.string(),
  type: z.string(),
  priority: z.string(),
  from: z.optional(z.string()),
  description: z.string(),
})

export const Feedback = z.object({
  name: z.optional(z.string()),
  from: z.optional(z.string()),
  rating: z.number(),
  comments: z.string(),
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
