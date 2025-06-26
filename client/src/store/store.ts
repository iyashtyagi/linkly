import { configureStore } from "@reduxjs/toolkit";
import { authReducer, urlsReducer } from "./slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        urls: urlsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;