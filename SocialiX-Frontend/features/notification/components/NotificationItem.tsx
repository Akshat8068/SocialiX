"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Bell,
    CheckCircle2,
    Heart,
    MessageCircle,
    UserPlus,
    UserRoundCheck,
} from "lucide-react";
import type { Notification } from "@/types/notification";

interface NotificationItemProps {
    notification: Notification;
    onRead?: (id: number) => void;
}

export default function NotificationItem({
    notification,
    onRead,
}: NotificationItemProps) {
    const { sender, type, message, createdAt, isRead } = notification;
    const senderName = sender?.username;
    const senderId = sender?.id;

    const getNotificationText = () => {
        switch (type) {
            case "FOLLOW":          return "started following you.";
            case "FOLLOW_REQUEST":  return "requested to follow you.";
            case "FOLLOW_ACCEPTED": return "accepted your follow request.";
            case "LIKE":            return "liked your post.";
            case "COMMENT":         return "commented on your post.";
            case "MESSAGE":         return "sent you a message.";
            default:                return "sent you a notification.";
        }
    };

    const getNotificationIcon = () => {
        switch (type) {
            case "FOLLOW":
            case "FOLLOW_REQUEST":  return <UserPlus className="h-3.5 w-3.5" />;
            case "FOLLOW_ACCEPTED": return <UserRoundCheck className="h-3.5 w-3.5" />;
            case "LIKE":            return <Heart className="h-3.5 w-3.5 fill-current" />;
            case "COMMENT":         return <MessageCircle className="h-3.5 w-3.5" />;
            default:                return <Bell className="h-3.5 w-3.5" />;
        }
    };

    const getIconBg = () => {
        switch (type) {
            case "LIKE":            return "bg-red-500 text-white";
            case "COMMENT":         return "bg-blue-500 text-white";
            case "FOLLOW":
            case "FOLLOW_REQUEST":  return "bg-green-500 text-white";
            case "FOLLOW_ACCEPTED": return "bg-purple-500 text-white";
            default:                return "text-white" /* fallback to primary below */;
        }
    };

    const formatTime = (date: string) => {
        const diff = Date.now() - new Date(date).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1)  return "now";
        if (mins < 60) return `${mins}m`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24)  return `${hrs}h`;
        const days = Math.floor(hrs / 24);
        if (days < 7)  return `${days}d`;
        return new Date(date).toLocaleDateString();
    };

    const handleClick = () => {
        if (!isRead && onRead) onRead(notification.id);
    };

    return (
        <div
            onClick={handleClick}
            className="relative flex cursor-pointer gap-3 px-4 py-4 transition"
            style={{
                borderBottom: "1px solid var(--theme-outline-variant)",
                backgroundColor: !isRead
                    ? "var(--theme-surface-container-low)"
                    : "transparent",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--theme-hover)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = !isRead
                    ? "var(--theme-surface-container-low)"
                    : "transparent")
            }
        >
            {/* Unread dot */}
            {!isRead && (
                <div
                    className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: "var(--theme-primary)" }}
                />
            )}

            {/* Avatar with type badge */}
            <Link
                href={senderId ? `/user/${senderId}` : "#"}
                onClick={(e) => e.stopPropagation()}
                className={`relative shrink-0 ${!isRead ? "ml-2" : ""}`}
            >
                <div className="relative h-12 w-12 overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--theme-surface-container)" }}>
                    <Image
                        src={sender?.profilePicture || "/Hero.jpg"}
                        alt={senderName || "User"}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Type icon badge */}
                <div
                    className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full ${getIconBg()}`}
                    style={
                        type === "MESSAGE"
                            ? { backgroundColor: "var(--theme-primary)" }
                            : undefined
                    }
                >
                    {getNotificationIcon()}
                </div>
            </Link>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <p
                    className="text-sm leading-5 md:text-[15px]"
                    style={{ color: "var(--theme-on-surface)" }}
                >
                    {/* Clickable username */}
                    {senderName && senderId ? (
                        <Link
                            href={`/user/${senderId}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-bold hover:underline"
                            style={{ color: "var(--theme-on-surface)" }}
                        >
                            {senderName}
                        </Link>
                    ) : (
                        <span className="font-bold">{senderName}</span>
                    )}{" "}
                    {getNotificationText()}
                </p>

                {/* Timestamp */}
                <p
                    className="mt-0.5 text-xs"
                    style={{ color: "var(--theme-on-surface-variant)" }}
                >
                    {formatTime(createdAt)}
                </p>

                {/* Comment / message preview */}
                {message && (type === "COMMENT" || type === "MESSAGE") && (
                    <p
                        className={`mt-1.5 text-sm ${
                            type === "COMMENT"
                                ? "pl-3 italic"
                                : "rounded-lg px-3 py-2"
                        }`}
                        style={{
                            color: "var(--theme-on-surface-variant)",
                            ...(type === "MESSAGE" && {
                                backgroundColor: "var(--theme-surface-container)",
                            }),
                            ...(type === "COMMENT" && {
                                borderLeft: "2px solid var(--theme-outline-variant)",
                            }),
                        }}
                    >
                        {message}
                    </p>
                )}

                {/* Follow request actions */}
                {type === "FOLLOW_REQUEST" && (
                    <div className="mt-3 flex gap-2">
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full px-4 py-1.5 text-sm font-medium transition hover:opacity-90"
                            style={{
                                backgroundColor: "var(--theme-primary)",
                                color: "var(--theme-on-primary)",
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full px-4 py-1.5 text-sm font-medium transition"
                            style={{
                                border: "1px solid var(--theme-outline)",
                                color: "var(--theme-on-surface)",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "var(--theme-hover)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                            }
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
