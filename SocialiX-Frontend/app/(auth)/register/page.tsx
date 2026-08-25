
"use client"
import { FormBuilder, type FormFieldConfig } from "@/components/common/FormBuilder";
import { useRegisterMutation } from "@/features/auth/api/auth.api";
import AuthHeader from "@/features/auth/components/AuthHeader";
import { RegisterFormData, registerSchema } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {  UserPlus } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const registerFields:FormFieldConfig[] = [
    {
        id: "fullname",
        type: "text",
        label: "Full Name",
        placeholder: "Full Name",
        required: true,
    },
    {
        id: "username",
        type: "text",
        label: "Username",
        placeholder: "Username",
        required: true,
    },
    {
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "name@gmail.com",
        required: true,
    },
    {
        id: "password",
        type: "password",
        label: "Password",
        placeholder: "••••••••",
        required: true,
    },
]

;
export default function RegisterPage() {
     const [register, { isLoading, isSuccess, isError, error }] =useRegisterMutation()
     const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
        fullname: "",
        username: "",
        email: "",
        password: "",
    },
})
const router =useRouter()

    const handleSubmit=async(data: RegisterFormData)=> {
        try {
            const response = await register(data).unwrap()
            toast.success(response.message)
            form.reset()
            router.push("/email-verify")
        } catch (error:any) {
             toast.error(error.data?.message ?? "Something went wrong")
        };
    }

    return (

        <>


            <AuthHeader
                icon={UserPlus}
                title="Join SocialiX"
                description="Experience the next generation of pro-social tools."
            />

            {/* Form */}
            <FormBuilder
            form={form}
                fields={registerFields}
                onSubmit={handleSubmit}
                submitButton={{
                    children: "Sign Up",
                    variant: "primary",
                    size: "lg",
                    fullWidth: true,
                }}
            />

            <p className="mt-xl text-sm text-on-surface-variant">
                Already  have an account?{" "}
                <Link href={"/login"} className="font-bold text-primary hover:underline">
                    Sign in
                </Link>
            </p>
        </>

    );
}