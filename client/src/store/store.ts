import { configureStore, Store } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { authApi } from "./api/authApi";
import { chatApi } from "./api/chatApi";
import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import { groupChatApi } from "./api/groupChatApi";

export const store: Store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [groupChatApi.reducerPath]: groupChatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      chatApi.middleware,
      userApi.middleware,
      groupChatApi.middleware,
      groupChatApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
