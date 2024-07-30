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
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query(body) {
        return {
          url: `/post/new`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Post"],
    }),
    UpOrDownVote: builder.mutation({
      query({ vote, id }: { vote: "up-vote" | "down-vote"; id: string }) {
        return {
          url: `/post/up-or-down-vote/${id}`,
          method: "POST",
          body: { vote },
        };
      },
      invalidatesTags: ["Post"],
    }),
    getFeedPost: builder.query({
      query() {
        return {
          url: `/post/feed-post`,
        };
      },
      providesTags: ["Post"],
      keepUnusedDataFor: 5,
    }),
    getSinglePost: builder.query({
      query(id) {
        return {
          url: `/post/${id}`,
        };
      },
      providesTags: ["Post"],
      keepUnusedDataFor: 5,
    }),
    getMyPosts: builder.query({
      query() {
        return {
          url: `/post/my-posts`,
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetFeedPostQuery,
  useGetSinglePostQuery,
  useUpOrDownVoteMutation,
  useGetMyPostsQuery,
} = postApi;
