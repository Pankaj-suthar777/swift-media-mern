import { Notification } from "@/@types/notifiction";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INotificationState {
  notifictionCount: number;
  notifictions: Notification[];
}

const initialState: INotificationState = {
  notifictionCount: 0,
  notifictions: [],
};

export const notifictionSlice = createSlice({
  initialState,
  name: "notifictionSlice",
  reducers: {
    setNotifictionCount: (state, action: PayloadAction<number>) => {
      state.notifictionCount = action.payload;
    },
    increaseNotifictionCountByOne: (state) => {
      state.notifictionCount = state.notifictionCount + 1;
    },
  },
});

export default notifictionSlice.reducer;

export const { setNotifictionCount, increaseNotifictionCountByOne } =
  notifictionSlice.actions;
