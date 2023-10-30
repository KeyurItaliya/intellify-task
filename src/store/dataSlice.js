import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submitedList: [],
};

export const listdataSlice = createSlice({
  name: "listdata",
  initialState: initialState,
  reducers: {
    setListData: (state, action) => {
      state.submitedList = action.payload;
    },
  },
});

export const { setListData } = listdataSlice.actions;

export default listdataSlice.reducer;
