import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INotificationState {
  notifictionCount: number;
}

const initialState: INotificationState = {
  notifictionCount: 0,
};

export const notifictionSlice = createSlice({
  initialState,
  name: "notifictionSlice",
  reducers: {
    setNotifictionCount: (state, action: PayloadAction<number>) => {
      state.notifictionCount = action.payload;
    },
  },
});

export default notifictionSlice.reducer;

export const { setNotifictionCount } = notifictionSlice.actions;
