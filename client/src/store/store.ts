import { configureStore } from "@reduxjs/toolkit";
import { urlAnalyticsReducer, urlsReducer } from "./features";
import { authReducer } from "./features/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        urls: urlsReducer,
        urlAnalytics: urlAnalyticsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;