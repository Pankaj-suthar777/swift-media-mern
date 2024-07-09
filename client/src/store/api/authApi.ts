import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
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
  }),
});

export const {
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
} = authApi;
