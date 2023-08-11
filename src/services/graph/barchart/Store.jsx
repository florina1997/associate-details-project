import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const barchartSlice = createSlice({
  name: "barchart",
  initialState,
  reducers: {
    getBarchartDetails(state, action) {
      state.barchartData = action.payload.barchartdata;
    },
  },
});

export default barchartSlice.reducer;
export const barchartActions = barchartSlice.actions;
