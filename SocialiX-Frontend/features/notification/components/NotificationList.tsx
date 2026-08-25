"use client";

import type { Notification } from "@/types/notification";
import NotificationItem from "./NotificationItem";

interface NotificationListProps {
    notifications: Notification[];
    onRead: (id: number) => void;
}

export default function NotificationList({
    notifications,
    onRead,
}: NotificationListProps) {
    if (!notifications.length) {
        return (
            <div
                className="flex min-h-64 items-center justify-center px-4 text-center text-sm"
                style={{ color: "var(--theme-on-surface-variant)" }}
            >
                No notifications yet
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={onRead}
                />
            ))}

            <div
                className="flex justify-center py-8 text-sm"
                style={{ color: "var(--theme-on-surface-variant)" }}
            >
                No more notifications
            </div>
        </div>
    );
}
