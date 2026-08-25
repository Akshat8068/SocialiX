"use client";

import { FormBuilder, type FormFieldConfig } from "@/components/common/FormBuilder";
import { useEmailVerifyMutation } from "@/features/auth/api/auth.api";
import AuthHeader from "@/features/auth/components/AuthHeader";
import { EmailVerifyFormData, emailVerifySchema } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
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

]
export default function VerifyEmailPage() {
    const [emailVerify, { isLoading, isSuccess, isError, error }] = useEmailVerifyMutation()
    const form = useForm<EmailVerifyFormData>({
        resolver: zodResolver(emailVerifySchema),
        defaultValues: {
            email: "",
            otp: "",
        },
    })
    const router = useRouter()
    const handleSubmit = async (data: EmailVerifyFormData) => {
        try {
            const response = await emailVerify(data).unwrap()

            toast.success(response.message)
            form.reset()
            router.push("/login")
        } catch (error: any) {
            toast.error(error.data?.message ?? "Something went wrong")
        };
    }
    return (

        <>

            {/* Header */}
            <AuthHeader
                icon={Mail}
                title="Verify Your Email"
                description="We've sent a 6-digit verification code to your email. Please enter it below to confirm your account."
            />

            {/* Form */}



            <FormBuilder
                fields={resetPasswordFields}
                onSubmit={handleSubmit}
                form={form}
                submitButton={{
                    children: isLoading ? "Verifying..." : "Verify Email",
                    variant: "primary",
                    size: "lg",
                    fullWidth: true,
                }}
            />



            {/* Footer */}

            <p className="mt-8 text-sm text-on-surface-variant">
                Wrong email?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-primary hover:underline"
                >
                    Go Back
                </Link>
            </p>

        </>
    );
}