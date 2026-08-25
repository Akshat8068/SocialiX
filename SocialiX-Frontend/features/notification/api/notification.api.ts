import baseApi from "@/store/api/baseApi";
import { ApiResponse } from "@/types/api";
import { Notification, NotificationQuery } from "@/types/notification";



interface NotificationsResponse {
    notifications: Notification[]
}

interface UnreadCountResponse {
    unreadCount: number
}
export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<ApiResponse<NotificationsResponse>, NotificationQuery | void>({
            query: () => ({
                url: "/notification",
                method: "GET",
            }),

            providesTags: ["Notification"],
        }),
        getUnreadCount: builder.query<ApiResponse<UnreadCountResponse>, void>({
            query: () => ({
                url: "/notification/unread-count",
                method: "GET",
            }),

            providesTags: ["Notification"],
        }),
        markAllNotificationsAsRead: builder.mutation<ApiResponse<null>, void>({
            query: () => ({
                url: "/notification/read-all",
                method: "PUT",
            }),

            invalidatesTags: ["Notification"],
        }),
        markNotificationAsRead: builder.mutation<ApiResponse<Notification>, number>({
            query: (id) => ({
                url: `/notification/${id}/read`,
                method: "PUT",
            }),

            invalidatesTags: ["Notification"],
        }),
        deleteNotification: builder.mutation<ApiResponse<null>, number>({
            query: (id) => ({
                url: `/notification/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Notification"],
        }),
    })
})



export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi