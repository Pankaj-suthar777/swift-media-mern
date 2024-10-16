import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import notifictionReducer from "./features/notifictionSlice";
import { authApi } from "./api/authApi";
import { chatApi } from "./api/chatApi";
import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import { groupChatApi } from "./api/groupChatApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    notifiction: notifictionReducer,
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
      postApi.middleware,
      groupChatApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
