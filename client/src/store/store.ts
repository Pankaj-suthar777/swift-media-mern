import { configureStore, Store } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { authApi } from "./api/authApi";
import { chatApi } from "./api/chatApi";
import { userApi } from "./api/userApi";
import searchUserSlice from "./features/searchUserSlice";

export const store: Store = configureStore({
  reducer: {
    auth: userReducer,
    search: searchUserSlice,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      chatApi.middleware,
      userApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
