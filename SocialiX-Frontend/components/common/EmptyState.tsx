"use client";

import {
    Users,
    MessageCircle,
    FileText,
    UserCheck,
    UserPlus,
    Send,
    Hash,
    Heart,
    Inbox,
    Search,
    type LucideIcon,
} from "lucide-react";

// ─── Preset configs ────────────────────────────────────────────────────────────
export type EmptyStateVariant =
    | "users"
    | "followers"
    | "following"
    | "sentRequests"
    | "pendingRequests"
    | "posts"
    | "comments"
    | "conversations"
    | "chat"
    | "likes"
    | "hashtags"
    | "search"
    | "custom";

const PRESETS: Record<
    Exclude<EmptyStateVariant, "custom">,
    { icon: LucideIcon; title: string; subtitle: string }
> = {
    users: {
        icon: Users,
        title: "No users found",
        subtitle: "Try searching with a different username.",
    },
    followers: {
        icon: UserCheck,
        title: "No followers yet",
        subtitle: "When someone follows you, they'll appear here.",
    },
    following: {
        icon: UserPlus,
        title: "Not following anyone",
        subtitle: "Follow people to see them here.",
    },
    sentRequests: {
        icon: Send,
        title: "No sent requests",
        subtitle: "Follow requests you send will appear here.",
    },
    pendingRequests: {
        icon: UserPlus,
        title: "No pending requests",
        subtitle: "Incoming follow requests will appear here.",
    },
    posts: {
        icon: FileText,
        title: "No posts yet",
        subtitle: "Posts you share will appear here.",
    },
    comments: {
        icon: MessageCircle,
        title: "No comments yet",
        subtitle: "Be the first to leave a comment.",
    },
    conversations: {
        icon: Inbox,
        title: "No conversations",
        subtitle: "Start a new chat to see it here.",
    },
    chat: {
        icon: MessageCircle,
        title: "Select a conversation",
        subtitle: "Choose a chat from the sidebar to start messaging.",
    },
    likes: {
        icon: Heart,
        title: "No likes yet",
        subtitle: "Users who like this will appear here.",
    },
    hashtags: {
        icon: Hash,
        title: "No hashtags found",
        subtitle: "Try a different keyword.",
    },
    search: {
        icon: Search,
        title: "No results found",
        subtitle: "Try a different search term.",
    },
};

// ─── Props ─────────────────────────────────────────────────────────────────────
interface EmptyStateProps {
    /** Predefined variant — sets icon, title and subtitle automatically */
    variant?: EmptyStateVariant;

    /** Override the icon (lucide-react component) */
    icon?: LucideIcon;

    /** Override the heading text */
    title?: string;

    /** Override the subtitle / description text */
    subtitle?: string;

    /** Extra wrapper className for layout control (e.g. min-height) */
    className?: string;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function EmptyState({
    variant = "custom",
    icon,
    title,
    subtitle,
    className = "",
}: EmptyStateProps) {
    const preset = variant !== "custom" ? PRESETS[variant] : null;

    const Icon = icon ?? preset?.icon ?? Users;
    const resolvedTitle = title ?? preset?.title ?? "Nothing here yet";
    const resolvedSubtitle = subtitle ?? preset?.subtitle ?? "";

    return (
        <div
            className={`flex flex-col items-center justify-center px-6 py-12 text-center ${className}`}
        >
            {/* Icon circle */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container">
                <Icon
                    className="h-8 w-8 text-on-surface-variant"
                    strokeWidth={1.6}
                    aria-hidden="true"
                />
            </div>

            {/* Heading */}
            <h3 className="text-base font-semibold text-on-surface">
                {resolvedTitle}
            </h3>

            {/* Subtitle */}
            {resolvedSubtitle && (
                <p className="mt-1 text-sm text-on-surface-variant">
                    {resolvedSubtitle}
                </p>
            )}
        </div>
    );
}
