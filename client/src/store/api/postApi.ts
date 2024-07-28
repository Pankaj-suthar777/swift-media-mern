import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",

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
    createPost: builder.mutation({
      query(body) {
        return {
          url: `/post/new`,
          method: "POST",
          body,
        };
      },
    }),
    getFeedPost: builder.query({
      query() {
        return {
          url: `/post/feed-post`,
        };
      },
    }),
  }),
});

export const { useCreatePostMutation, useGetFeedPostQuery } = postApi;
