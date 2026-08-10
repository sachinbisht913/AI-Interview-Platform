import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import historyReducer from "./historySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        history: historyReducer,
    },
});

export default store;