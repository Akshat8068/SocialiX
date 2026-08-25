"use client"

import { useGetUsersQuery } from "../profile/api/profile.api";
import UserList from "./UserList";
export default function Users() {
    const {data,isLoading,isError}=useGetUsersQuery()
    return (
        <div className="mx-auto w-full max-w-7xl  px-4 sm:px-6 lg:px-8 pt-5 md:pt-20 ">
            <header className="mb-8">
                <h1 className="text-2xl font-bold md:text-3xl">
                    Find People
                </h1>

                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    Discover creators and friends on SocialiX.
                </p>
            </header>

            <UserList users={data?.data ?? []}  />
        </div>
    );
}