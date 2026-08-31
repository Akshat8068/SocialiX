"use client";

import { FormBuilder, type FormFieldConfig } from "@/components/common/FormBuilder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { useResetPasswordMutation } from "@/features/auth/api/auth.api";
import AuthHeader from "@/features/auth/components/AuthHeader";
import { ResetPasswordFormData, resetPasswordSchema } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const resetPasswordFields: FormFieldConfig[] = [
    {
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "name@gmail.com",
        required: true,
    },
    {
        id: "otp",
        type: "otp",
        label: "Verification Code",
        length: 4,
        required: true,
    },
    {
        id: "newPassword",
        type: "password",
        label: "New Password",
        placeholder: "••••••••",
        required: true,
    },
]
export default function ResetPasswordPage() {
    const router=useRouter()
    const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation()
        const form = useForm<ResetPasswordFormData>({
            resolver: zodResolver(resetPasswordSchema),
            defaultValues: {
                email: "",
                otp: "",
                newPassword:""
            },
        })
        const handleSubmit = async (data: ResetPasswordFormData) => {
            try {
                const response = await resetPassword(data).unwrap()
                toast.success(response.message)
                form.reset()
                router.push("login")

            } catch (error: any) {
                toast.error(error.data?.message ?? "Something went wrong")
            };
        }
    return (

        <>
            <AuthHeader icon={Lock} title="Reset Password" description="Enter your email, verification code, and create a new
                        password to regain access to your account." />

            {/* Form */}
            <FormBuilder
                fields={resetPasswordFields}
                onSubmit={handleSubmit}
                form={form}
                submitButton={{
                    children: "Reset Password",
                    variant: "primary",
                    size: "lg",
                    fullWidth: true,
                }}
            />

            {/* Footer */}

            <p className="mt-xl text-sm text-on-surface-variant">
                Remember your password?{" "}
                <Link href={"/login"} className="font-bold text-primary hover:underline">
                    Sign In
                </Link>
            </p>

        </>

    )
}