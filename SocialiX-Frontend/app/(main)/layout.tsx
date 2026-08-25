"use client"
import ProtectedRoute from "@/components/common/ProtectedRoutes";
import AuthProvider from "./authProvider";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { useEffect } from "react";
import { socket } from "@/features/chat/services/socket";
export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, [])
    return (
        <AuthProvider>
            <ProtectedRoute>
                <Navigation />
                {/* Offset content area to the right of the sidebar on md+ */}
                <div className="flex min-h-screen flex-col md:pl-20 lg:pl-64">
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </ProtectedRoute>
        </AuthProvider>
    );
}