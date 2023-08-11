import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter(state) {
      state.count++;
    },
    decrementCounter(state) {
      state.count--;
    },
  },
});

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;
