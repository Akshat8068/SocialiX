"use client";

import { useGetMeQuery } from "@/features/auth/api/auth.api";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess, logout, setAuthChecked } from "@/store/slices/auth.slice";
import { useEffect } from "react";


 const AuthProvider=({children}: {children: React.ReactNode;})=> {
    const dispatch = useAppDispatch()

    const { data, isSuccess, isError, isLoading } = useGetMeQuery();

    useEffect(() => {
        if (isLoading) return;

        if (isSuccess && data?.data) {
            dispatch(loginSuccess(data.data))
        } else if (isError) {
            dispatch(logout());
        }

        dispatch(setAuthChecked(true));
    }, [isSuccess, isError, isLoading, data, dispatch]);

    return <>{children}</>;
}
export default AuthProvider