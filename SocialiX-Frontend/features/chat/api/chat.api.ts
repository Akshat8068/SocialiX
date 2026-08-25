import baseApi from "@/store/api/baseApi";
import type { ApiResponse } from "@/types/api";
import type {
  ConversationResponse,
  CreateConversationRequest,
  CreateConversationResponse,
  Message,
} from "@/types/chat";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all conversations
    getConversations: builder.query<ApiResponse<ConversationResponse[]>,void>({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    // Get messages of a conversation
    getConversationMessages: builder.query<ApiResponse<Message[]>,number>({
      query: (conversationId) => ({
        url: `/chat/messages/${conversationId}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    // Create a conversation
    createConversation: builder.mutation<ApiResponse<CreateConversationResponse>,CreateConversationRequest>({
      query: (body) => ({
        url: "/chat/conversation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationMessagesQuery,
  useCreateConversationMutation,
} = chatApi;