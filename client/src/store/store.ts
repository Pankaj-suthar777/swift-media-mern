import { configureStore, Store } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import searchReducer from "./features/searchUserSlice";
import { authApi } from "./api/authApi";
import { chatApi } from "./api/chatApi";
import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";

export const store: Store = configureStore({
  reducer: {
    auth: userReducer,
    search: searchReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      chatApi.middleware,
      userApi.middleware,
      postApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
