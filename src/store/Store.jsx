import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// add all reducers here
import counterReducer from "../pages/app/counter/Store";
import dashboardReducer from "../pages/app/dashboard/Store";
import onboardingReducer from "../pages/app/onboarding/Store";
// import piechartReducer from "../services/graph/piechart/Store";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    dashboard: dashboardReducer,
    // onboarding: onboardingReducer,
    // piechart: piechartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
