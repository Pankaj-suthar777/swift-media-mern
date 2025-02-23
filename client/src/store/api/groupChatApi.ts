import { GroupChat, GroupMessage } from "@/@types/groupChat";
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
  tagTypes: ["Chat", "Message", "ChatInfo"],
  endpoints: (builder) => ({
    sendGroupMessage: builder.mutation({
      query({ body, id }) {
        return {
          url: `/group-chat/send-group-message/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Chat"],
    }),

    getMyGroupChats: builder.query<GroupChat[], null>({
      query() {
        return {
          url: `/group-chat/get-my-group-chats`,
        };
      },
      providesTags: ["Chat"],
      keepUnusedDataFor: 5,
    }),

    getGroupChatById: builder.query({
      query(id) {
        return {
          url: `/group-chat/get-group-chat/${id}`,
        };
      },
      providesTags: ["ChatInfo"],
      keepUnusedDataFor: 5,
    }),

    getGroupChatMessages: builder.query<
      GroupMessage[],
      { chatId: string | undefined }
    >({
      query({ chatId }) {
        return {
          url: `/group-chat/get-group-chat-messages/${chatId}`,
        };
      },
      //providesTags: ["Message"],
      // keepUnusedDataFor: 5,
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
    updateGroup: builder.mutation({
      query({ body, id }) {
        return {
          url: `/group-chat/update-group/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["ChatInfo"],
    }),
  }),
});

export const {
  useSendGroupMessageMutation,
  useGetMyGroupChatsQuery,
  useGetGroupChatMessagesQuery,
  useCreateGroupMutation,
  useGetGroupChatByIdQuery,
  useUpdateGroupMutation,
} = groupChatApi;
