"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const { isAuthenticated, authChecked } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (!authChecked) return

        if (!isAuthenticated) {
            router.replace("/login")
        }
    }, [authChecked, isAuthenticated, router]);

    if (!authChecked) {
        return <div className="text-center min-h-screen flex font-semibold justify-center items-center">Socialix...</div>
    }

    return <>{children}</>
}