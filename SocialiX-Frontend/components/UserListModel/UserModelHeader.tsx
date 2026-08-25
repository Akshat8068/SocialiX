"use client";

import { X } from "lucide-react";

interface FollowModalHeaderProps {
    title: string;
    count?: number;
    onClose: () => void;
}

export default function UserModelHeader({
    title,
    count,
    onClose,
}: FollowModalHeaderProps) {
    return (
        <div className="sticky top-0 z-10 bg-surface-container">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 md:pt-5">
                <div className="flex items-center gap-2 min-w-0">
                    <h2 className="truncate text-xl font-semibold text-on-surface">
                        {title}
                    </h2>

                    <span className="inline-flex items-center rounded-full bg-badge  px-2.5 py-1  font-medium text-on-badge">
                        {count}
                    </span>
                </div>

                {/* Mobile Close */}
                <button
                    type="button"
                    onClick={onClose}
                    className="
            flex h-9 w-9 items-center justify-center rounded-full
            hover:bg-hover
            active:scale-95
            transition
            md:hidden
          "
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            </div>


        </div>
    );
}