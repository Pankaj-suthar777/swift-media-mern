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
    getAllUsers: builder.query<{ users: UserColumn[] }, number>({
      query(pageNo) {
        return {
          url: "/get-all-users?pageNo=" + pageNo,
        };
      },
    }),
    getPopularUsers: builder.query<{ users: PopularUsers[] }, void>({
      query() {
        return {
          url: "/get-popular-users",
        };
      },
    }),
    deleteUser: builder.mutation<{ message: string }, number>({
      query(id: number) {
        return {
          url: "/delete-user/" + id,
          method: "POST",
          body: {},
        };
      },
    }),
    chnagePassword: builder.mutation<{ message: string }, any>({
      query(body: {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
      }) {
        return {
          url: "/change-password",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export interface PopularUsers extends UserColumn {
  about: string;
}

export const {
  useGetDashboardDataQuery,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetPopularUsersQuery,
  useDeleteUserMutation,
  useChnagePasswordMutation,
} = adminApi;
