"use client"

import { FormBuilder, type FormFieldConfig } from "@/components/common/FormBuilder";
import { useLoginMutation } from "@/features/auth/api/auth.api";
import AuthHeader from "@/features/auth/components/AuthHeader";
import { LoginFormData, loginSchema } from "@/features/auth/validation";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess, setAuthenticated, setUser } from "@/store/slices/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const loginFields: FormFieldConfig[] = [
    {
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "name@gmail.com",
    },
    {
        id: "password",
        type: "password",
        label: "Password",
        required: true,
        placeholder: "••••••••",
    },
]

export default function LoginPage() {
    const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()
    const dispatch=useAppDispatch()
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },
    })
    const router = useRouter();
    const handleSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data).unwrap()
            toast.success(response.message)
            form.reset()
            dispatch(loginSuccess(response.data))
            router.push("/home")
        } catch (error: any) {
            toast.error(error.data?.message ?? "Something went wrong")
        };
    }

    return (

        <>
            <AuthHeader icon={User} title="Welcome Back" description="Sign in to continue your journey" />

            {/* Form */}

            <FormBuilder
                fields={loginFields}
                form={form}
                onSubmit={handleSubmit}
                submitButton={{
                    children: " Sign In",
                    fullWidth: true,
                }}
            />

            <div className="mt-3 flex justify-end">
                <Link href="/forget-password">
                    Forgot Password?
                </Link>
            </div>

            <p className="mt-xl text-sm text-on-surface-variant">
                Don't have an account?{" "}
                <Link href={"/register"} className="font-bold text-primary hover:underline">
                    Create Account
                </Link>
            </p>
        </>
    );
}