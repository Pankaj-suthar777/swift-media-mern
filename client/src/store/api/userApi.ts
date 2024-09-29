import { Notification } from "@/@types/notifiction";
import { User } from "@/@types/user";
import { baseURL } from "@/api/client";
import { AllPeople } from "@/pages/Peoples";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",

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
  endpoints: (builder) => ({
    getProfile: builder.query({
      query(id) {
        return {
          url: `/user/${id}`,
        };
      },
    }),
    getRecommendedUser: builder.query({
      query() {
        return {
          url: `/user/recommended-user`,
        };
      },
    }),
    isFollow: builder.query({
      query(id) {
        return {
          url: `/user/is-follow/${id}`,
        };
      },
    }),
    followUser: builder.mutation({
      query(id) {
        return {
          url: `/user/follow-user/${id}`,
          method: "POST",
        };
      },
    }),
    searchUser: builder.query({
      query(searchValue) {
        return {
          url: `/user/search-user?search=${searchValue}`,
        };
      },
    }),
    userDashboard: builder.query<
      {
        totalCommentsCount: number;
        messageCount: number;
        postUpvotesCount: number;
        postDisvotesCount: number;
        GroupChatsYouPartOf: number;
        chatsYouPartOf: number;
        recentFollowers: User[];
      },
      null
    >({
      query() {
        return {
          url: `/user/dashboard`,
        };
      },
    }),
    userDashboardMessageData: builder.query<
      {
        data: {
          date: string;
          count: number;
        }[];
      },
      null
    >({
      query() {
        return {
          url: `/user/dashboard/messages-send-data`,
        };
      },
    }),
    userDashboardPostVoteData: builder.query<
      {
        data: {
          date: string;
          upvote: number;
          disvote: number;
        }[];
      },
      string
    >({
      query(duration) {
        return {
          url: `/user/dashboard/post-vote-data?duration=${duration}`,
        };
      },
    }),
    getUserFollowingList: builder.query({
      query(id) {
        return {
          url: `/user/get-following-list/${id}`,
        };
      },
    }),
    getUserFollowersList: builder.query({
      query(id) {
        return {
          url: `/user/get-followers-list/${id}`,
        };
      },
    }),
    getAllPeoples: builder.query<{ peoples: AllPeople[] }, null>({
      query() {
        return {
          url: `/user/get-peoples`,
        };
      },
    }),
    getMyNotification: builder.query<{ notifications: Notification[] }, null>({
      query() {
        return {
          url: `/user/get-notification`,
        };
      },
    }),
    getMyNotificationsCount: builder.query<
      { notificationsCount: number },
      null
    >({
      query() {
        return {
          url: `/user/get-notification-count`,
        };
      },
    }),
    seenNotification: builder.mutation({
      query() {
        return {
          url: `/user/seen-notification`,
          method: "PUT",
        };
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetRecommendedUserQuery,
  useFollowUserMutation,
  useIsFollowQuery,
  useLazySearchUserQuery,
  useUserDashboardQuery,
  useUserDashboardMessageDataQuery,
  useUserDashboardPostVoteDataQuery,
  useLazyUserDashboardPostVoteDataQuery,
  useGetUserFollowersListQuery,
  useGetUserFollowingListQuery,
  useGetAllPeoplesQuery,
  useGetMyNotificationQuery,
  useGetMyNotificationsCountQuery,
  useSeenNotificationMutation,
} = userApi;
