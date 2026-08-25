"use client";

import NotificationHeader from "@/features/notification/components/NotificationHeader";
import NotificationList from "@/features/notification/components/NotificationList";

import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "@/features/notification/api/notification.api";

export default function NotificationPage() {
  const {
    data,
    isLoading,
    isError,
  } = useGetNotificationsQuery({
    page: 1,
    limit: 20,
  });

  const [markNotificationAsRead] =
    useMarkNotificationAsReadMutation();

  const notifications = data?.data?.notifications ?? [];

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id).unwrap();
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--theme-background)" }}>
      <NotificationHeader />

      <main className="mx-auto min-h-screen w-full max-w-4xl pt-16">
        {isLoading && (
          <div className="flex min-h-100 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading notifications...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex min-h-100 items-center justify-center px-4">
            <p className="text-center text-sm text-destructive">
              Failed to load notifications. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <NotificationList
            notifications={notifications}
            onRead={handleMarkAsRead}
          />
        )}
      </main>
    </div>
  );
}