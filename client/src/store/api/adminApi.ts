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
  }),
});

// export const {} = authApi;
