import { baseURL } from "@/api/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupChatApi = createApi({
  reducerPath: "groupChatApi",

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
    sendGroupMessage: builder.mutation({
      query(body) {
        return {
          url: `/group-chat/send-group-message`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Message", "Chat"],
    }),

    getMyGroupChats: builder.query({
      query() {
        return {
          url: `/group-chat/get-my-group-chats`,
        };
      },
      providesTags: ["Chat"],
      keepUnusedDataFor: 5,
    }),

    getGroupChatMessages: builder.query({
      query({ chatId }) {
        return {
          url: `/group-chat/get-group-chat-messages/${chatId}`,
        };
      },
      providesTags: ["Message"],
      keepUnusedDataFor: 5,
    }),
    createGroup: builder.mutation({
      query(body) {
        return {
          url: `/group-chat/create-group`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useSendGroupMessageMutation,
  useGetMyGroupChatsQuery,
  useGetGroupChatMessagesQuery,
  useCreateGroupMutation,
} = groupChatApi;
