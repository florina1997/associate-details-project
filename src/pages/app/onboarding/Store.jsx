import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    getOnboardingDetails(state, action) {
      state.onboardingData = action.payload.onboardingdata;
    },
  },
});

export default onboardingSlice.reducer;
export const onboardingActions = onboardingSlice.actions;
