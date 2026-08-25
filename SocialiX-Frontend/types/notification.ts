import { User } from "./auth";

export enum NotificationType {
  FOLLOW = "FOLLOW",
  FOLLOW_REQUEST = "FOLLOW_REQUEST",
  FOLLOW_ACCEPTED = "FOLLOW_ACCEPTED",
  LIKE = "LIKE",
  COMMENT = "COMMENT",
  MESSAGE = "MESSAGE",
}



export interface Notification {
  id: number;

  recipientId: number;
  senderId: number;

  sender?: User

  type: NotificationType;

  postId: number | null;
  commentId: number | null;
  conversationId: number | null;

  message: string | null;

  isRead: boolean;

  createdAt: string;
}

export interface NotificationQuery {
  page?: number;
  limit?: number;
}

export interface NotificationSocketPayload {
  id: number;

  recipientId: number;
  senderId: number

  sender:User

  type: NotificationType;

  postId: number | null;
  commentId: number | null;
  conversationId: number | null;
  message: string | null;
  isRead: boolean;
  createdAt: string;
}