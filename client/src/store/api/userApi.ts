import { User } from "@/@types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",

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
    getProfile: builder.query<User, string>({
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
  }),
});

export const { useGetProfileQuery, useGetRecommendedUserQuery } = userApi;
