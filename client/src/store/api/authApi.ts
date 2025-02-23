import { baseURL } from "@/api/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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
    adminLogin: builder.mutation({
      query(body) {
        return {
          url: "/auth/admin/login",
          method: "POST",
          body,
        };
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        };
      },
    }),
    logout: builder.mutation({
      query() {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: "/password/forgot",
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: "PUT",
          body,
        };
      },
    }),
    getUserInfo: builder.query({
      query() {
        return {
          url: `/auth/get-user`,
        };
      },
    }),
    adminGetUserInfo: builder.query({
      query() {
        return {
          url: `/auth/admin/get-user`,
        };
      },
    }),
    updateUserProfile: builder.mutation({
      query(body) {
        return {
          url: `/auth/update-user-info`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginMutation,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useLogoutMutation,
  useAdminLoginMutation,
  useAdminGetUserInfoQuery,
  useLazyAdminGetUserInfoQuery,
  useUpdateUserProfileMutation,
} = authApi;
