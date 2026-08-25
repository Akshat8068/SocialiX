"use client";

import { FollowUser } from "./UserListModel";


interface FollowRequestActionsProps {
    user: FollowUser;

    onAccept?: (id: number) => void;
    onReject?: (id: number) => void;

    accepting?: boolean;
    rejecting?: boolean;
}

export default function UserRequestActions({
    user,
    onAccept,
    onReject,
    accepting = false,
    rejecting = false,
}: FollowRequestActionsProps) {
    return (
        <div className="flex items-center gap-2">
            {/* Reject */}
            <button
                type="button"
                disabled={accepting || rejecting}
                onClick={() => {
                    if (user.requestId) {
                        onReject?.(user.requestId);
                    }
                }}
                className="
          h-10
          rounded-xl
          border
          border-zinc-300
          bg-white
          px-4
          text-sm
          font-medium
          text-zinc-700
          transition-all

          hover:border-red-300
          hover:bg-red-50
          hover:text-red-600

          active:scale-95

          disabled:cursor-not-allowed
          disabled:opacity-50

          dark:border-zinc-700
          dark:bg-on-background
          dark:text-zinc-300
          dark:hover:border-red-500
          dark:hover:bg-red-500/10
          dark:hover:text-red-400
        "
            >
                {rejecting ? "Rejecting..." : "Reject"}
            </button>

            {/* Accept */}
            <button
                type="button"
                disabled={accepting || rejecting}
                onClick={() => {
                    if (user.requestId) {
                        onAccept?.(user.requestId);
                    }
                }}
                className="
          h-10
          rounded-xl
          bg-orange-500
          px-5
          text-sm
          font-semibold
          text-white
          transition-all

          hover:bg-orange-600
          active:scale-95

          disabled:cursor-not-allowed
          disabled:opacity-50
        "
            >
                {accepting ? "Accepting..." : "Accept"}
            </button>
        </div>
    );
}