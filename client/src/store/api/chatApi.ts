import { baseURL } from "@/api/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",

  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Chat", "Message"],
  endpoints: (builder) => ({
    getSearchChatUsers: builder.query({
      query({ searchValue }) {
        return {
          url: `/chat/search?search=${searchValue}`,
        };
      },
    }),

    sendMessage: builder.mutation({
      query(body) {
        return {
          url: `/chat/send-message`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Message", "Chat"],
    }),

    getMyChats: builder.query({
      query() {
        return {
          url: `/chat/get-my-chats`,
        };
      },
      providesTags: ["Chat"],
      keepUnusedDataFor: 5,
    }),

    getChatMessages: builder.query({
      query({ chatId }) {
        return {
          url: `/chat/get-chat-messages/${chatId}`,
        };
      },
      providesTags: ["Message"],
      keepUnusedDataFor: 5,
    }),
    getOtherUserAndMyChat: builder.query({
      query({ other_user_id }) {
        return {
          url: `/chat/other-user-chat-with-me/${other_user_id}`,
        };
      },
      providesTags: ["Message"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLazyGetSearchChatUsersQuery,
  useSendMessageMutation,
  useGetMyChatsQuery,
  useGetChatMessagesQuery,
  useGetOtherUserAndMyChatQuery,
} = chatApi;
