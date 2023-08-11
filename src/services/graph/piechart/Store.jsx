import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const piechartSlice = createSlice({
  name: "piechart",
  initialState,
  reducers: {
    getPieChartDetails(state, action) {
      state.piechartData = action.payload.piechartdata;
    },
  },
});

export default piechartSlice.reducer;
export const pichartActions = piechartSlice.actions;
