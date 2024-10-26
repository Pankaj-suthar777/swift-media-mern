import { baseURL } from "@/api/client";
import { UserColumn } from "@/components/admin/users/all-users-table/columns";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL + "/admin",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDashboardData: builder.query<
      {
        userCount: number;
        postCount: number;
        chartData: { date: string; users: number; posts: number }[];
      },
      void
    >({
      query() {
        return {
          url: "/dashboard",
        };
      },
    }),
    getAllUsers: builder.query<{ users: UserColumn[] }, void>({
      query() {
        return {
          url: "/get-all-users",
        };
      },
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetAllUsersQuery } = adminApi;
