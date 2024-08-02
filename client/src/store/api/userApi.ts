import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://swift-media-mern.onrender.com/api",
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
  }),
});

export const {
  useGetProfileQuery,
  useGetRecommendedUserQuery,
  useFollowUserMutation,
  useIsFollowQuery,
  useLazySearchUserQuery,
} = userApi;
