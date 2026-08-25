"use client";
import { useAcceptRequestMutation, useCancelRequestMutation, useGetPendingRequestQuery, useGetSentRequestQuery, useRejectRequestMutation } from "@/features/follow/api/follow.api";
import { LogOut, LogOutIcon, Power, Search, Send, SunMoon, UserCheck, UserPlus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { FollowUser } from "./UserListModel/UserListModel";
import { useLogoutMutation } from "@/features/auth/api/auth.api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/auth.slice";
import { setTheme, Theme } from "@/store/slices/theme.slice";
import { Select } from "./ui/select";

const UserListModel = dynamic(() => import("./UserListModel/UserListModel"), {
  loading: () => null,
});


const themes: Theme[] = ["orange", "light", "dark"]
const themeOptions = [
  {
    label: "Premium",
    value: "orange",
  },
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
]
export default function Header() {
  const [modal, setModal] = useState<"pending" | "sent" | null>(null);
  const [search, setSearch] = useState("")
  const [themeOpen, setThemeOpen] = useState(false);
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector((state) => state.theme.theme)
  const handleThemeChange = (theme: Theme) => {
    dispatch(setTheme(theme))
  }
  const router = useRouter()
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutMutation()
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout())
      toast.success("Logout successfull")
      router.replace("/login")

    } catch (error) {
      console.error("Logout failed:")
    }
  }
  const {
    data: pendingData,
    isLoading: pendingLoading,
  } = useGetPendingRequestQuery(undefined, {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
  });

  const {
    data: sentData,
    isLoading: sentLoading,
  } = useGetSentRequestQuery()
  const [acceptRequest] = useAcceptRequestMutation()

  const [rejectRequest] = useRejectRequestMutation()

  const [cancelRequest] = useCancelRequestMutation()
  const pendingUsers: FollowUser[] =
    pendingData?.data?.map((item) => ({
      id: item.follower.id,
      requestId: item.id,

      fullName: item.follower.fullname,
      username: item.follower.username,
      profilePicture: item.follower.profilePicture ?? undefined,
      isVerified: item.follower.isVerified,
    })) ?? []
  const sentUsers: FollowUser[] =
    sentData?.data?.map((item) => ({
      id: item.following.id,
      requestId: item.id,

      fullName: item.following.fullname,
      username: item.following.username,
      profilePicture: item.following.profilePicture ?? undefined,
      isVerified: item.following.isVerified,
      requested: true,
    })) ?? []
  const handleAccept = async (id: number) => {
    try {
      await acceptRequest({ id }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectRequest({ id }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelRequest = async (id: number) => {
    try {
      await cancelRequest({ id }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant/30 bg-surface/80 px-4 backdrop-blur-xl md:hidden">

        <h1 className="text-xl font-bold tracking-tight text-primary">
          SocialiX
        </h1>

        <div className="flex items-center gap-3">

          <button
            onClick={() => setModal("sent")}
            className="rounded-full p-2 transition hover:bg-surface-container-low"
          >
            <UserPlus size={22} />
          </button>
          <button
            onClick={() => setModal("pending")}
            className="rounded-full p-2 transition hover:bg-surface-container-low"
          >
            <UserCheck size={22} />
          </button>
          <Link href={"/chat"}>
            <button

              className="rounded-full p-2 transition hover:bg-surface-container-low"
            >
              <Send size={22} />
            </button>
          </Link>
          <div className="w-32">
            <Select
              icon={SunMoon}
              options={themeOptions}
              value={currentTheme}
              className="h-10"
              onChange={(e) =>
                handleThemeChange(e.target.value as Theme)
              }
            />
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-full p-2 transition hover:bg-surface-container-low"
          >
            <Power className="text-red-600" size={22} />

          </button>


        </div>
      </header>

      <header className="sticky top-0 z-40 hidden h-16 items-center justify-end border-b border-outline-variant bg-surface/80 px-6 backdrop-blur-xl md:flex">




        <div className="flex items-center gap-5">

          <button
            onClick={() => setModal("sent")}
            className="rounded-full p-2 transition hover:bg-surface-container-low"
          >
            <UserPlus size={22} />
          </button>

          <button
            onClick={() => setModal("pending")}
            className="rounded-full p-2 transition hover:bg-surface-container-low"
          >
            <UserCheck size={22} />
          </button>
          <div className="w-36">
            <Select
              icon={SunMoon}
              options={themeOptions}
              value={currentTheme}
              onChange={(e) =>
                handleThemeChange(e.target.value as Theme)
              }
              className="h-10"
            />
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-full p-2 transition hover:bg-surface-container-low"
          >
            <Power className="text-red-600" size={22} />
          </button>


        </div>

      </header>
      <UserListModel
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal === "pending" ? "Follow Requests" : "Sent Requests"}
        count={modal === "pending" ? pendingUsers.length : sentUsers.length}
        type={modal === "pending" ? "requests" : "following"}
        users={modal === "pending" ? pendingUsers : sentUsers}
        loading={modal === "pending" ? pendingLoading : sentLoading}
        search={search}
        onSearchChange={setSearch}
        onAccept={(requestId) => handleAccept(requestId)}
        onReject={(requestId) => handleReject(requestId)}
        onUnfollow={(requestId) => handleCancelRequest(requestId)}
      />
    </>
  );
}