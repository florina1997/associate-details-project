import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getDashboardDetails(state, action) {
      state.dashboardData = action.payload.dashboardData;
    },
  },
});

export default dashboardSlice.reducer;
export const dashboardActions = dashboardSlice.actions;
