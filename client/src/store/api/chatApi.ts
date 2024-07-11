import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    }),
    getMyChats: builder.query({
      query() {
        return {
          url: `/chat/get-my-chats`,
        };
      },
    }),

    getChatMessages: builder.query({
      query({ chatId }) {
        return {
          url: `/chat/get-chat-messages/${chatId}`,
        };
      },
    }),
  }),
});

export const {
  useLazyGetSearchChatUsersQuery,
  useSendMessageMutation,
  useGetMyChatsQuery,
  useGetChatMessagesQuery,
} = chatApi;
