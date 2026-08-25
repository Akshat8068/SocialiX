import { z } from "zod";

export const registerSchema = z.object({
    fullname: z.string(),
    username: z.string().min(2, "UserName must be atleast 2 charcters"),
    email: z.email("Invalid Email Address").toLowerCase(),
    password: z.string().min(8, "Password must be atleast 8 charcters")
})

export const loginSchema = z.object({
    email: z.email("Invalid Email Address").toLowerCase(),
    password: z.string().min(8, "Password must be atleast 8 charcters")
})
export const emailVerifySchema = z.object({
    email: z.email("Invalid Email Address").toLowerCase(),
    otp: z
        .string()
        .length(4, "OTP must be 4 digits"),
})
export const forgetEmailSchema = z.object({
    email: z.email("Invalid Email Address").toLowerCase()
})
export const resetPasswordSchema = z.object({
    email: z.email("Invalid Email Address").toLowerCase(),
    otp: z.string().length(4, "OTP must be 4 digits"),
    newPassword: z.string().min(8, "Password must be atleast 8 charcters")
})
export const ProfileUpdateSchema = z.object({
    bio: z.string().max(150, "Bio have onlu 150 words").optional(),
   website: z
        .string()
        .url("Please enter a valid URL")
        .or(z.literal(""))
        .optional(),
    accountType: z.enum(["PUBLIC", "PRIVATE"]).optional(),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type EmailVerifyFormData = z.infer<typeof emailVerifySchema>
export type ForgetEmailFormData = z.infer<typeof forgetEmailSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type UpdateProfileFormData = z.infer<typeof ProfileUpdateSchema>