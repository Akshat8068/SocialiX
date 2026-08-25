"use client";

import { FormBuilder, FormFieldConfig } from "@/components/common/FormBuilder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { useForgetEmailMutation } from "@/features/auth/api/auth.api";
import AuthHeader from "@/features/auth/components/AuthHeader";
import { ForgetEmailFormData, forgetEmailSchema } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const forgotPasswordFields: FormFieldConfig[] = [
    {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "name@gmail.com",
        required: true,
        helperText: "We'll send a password reset link to this email.",
    },
]
export default function ForgotPasswordPage() {
    const [forgetEmail, { isLoading, isSuccess, isError, error }] = useForgetEmailMutation()
    const form = useForm<ForgetEmailFormData>({
        resolver: zodResolver(forgetEmailSchema),

        defaultValues: {
            email: ""
        },
    })
    const router = useRouter()
    const handleSubmit = async (data: ForgetEmailFormData) => {
        try {
            const response = await forgetEmail(data).unwrap()
            toast.success(response.message)
            form.reset()
            router.push("/reset-password")
        } catch (error: any) {
            toast.error(error.data?.message ?? "Something went wrong")
        };
    }
    return (

        <>
            <AuthHeader icon={Mail} title="Forgot Password" description="Enter your registered email address and we'll send
                            you a verification code to reset your password."/>

            {/* Form */}

            <FormBuilder
                fields={forgotPasswordFields}
                form={form}
                onSubmit={handleSubmit}
                submitButton={{
                    children: "Proceed",
                    variant: "primary",
                    size: "lg",
                    fullWidth: true,
                }}
            />

            {/* Footer */}

            <p className="mt-8 text-sm text-on-surface-variant">
                Remember your password?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                >
                    Sign In
                </Link>
            </p>

        </>

    );
}