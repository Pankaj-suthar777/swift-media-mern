import { configureStore, Store } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { authApi } from "./api/authApi";
import { chatApi } from "./api/chatApi";

export const store: Store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, chatApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
