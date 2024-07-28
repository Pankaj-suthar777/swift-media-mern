import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  value: string;
}

const initialState: InitialState = {
  value: "",
};

export const searchUserSlice = createSlice({
  initialState,
  name: "searchUserSlice",
  reducers: {
    setSerachValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export default searchUserSlice.reducer;

export const { setSerachValue } = searchUserSlice.actions;
