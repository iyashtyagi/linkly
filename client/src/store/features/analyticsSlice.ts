import type { AnalyticsState } from "@/types/linkly-type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialAnalyticsState: AnalyticsState = {
    urlMetadata: {
        id: "",
        userId: "",
        url: "",
        slug: "",
        totalClicks: 0,
        createdAt: ""
    },
    lastClickDetails: [],
    analytics: {
        byCountry: [],
        byState: [],
        byCity: [],
        byDevice: [],
        byBrowser: [],
        byOS: [],
        byClickType: [],
        byDateUserTimeZone: []
    },
    loading: false,
    error: null
};

const urlAnalyticsSlice = createSlice({
    name: "urlAnalytics",
    initialState: initialAnalyticsState,
    reducers: {
        setAnalyticsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setAnalyticsError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setAnalyticsData: (state, action: PayloadAction<any>) => {
            state.urlMetadata = action.payload.urlMetadata || initialAnalyticsState.urlMetadata;
            state.lastClickDetails = action.payload.lastClickDetails || initialAnalyticsState.lastClickDetails;
            state.analytics = action.payload.analytics || initialAnalyticsState.analytics;
        }
    }
});

export const { setAnalyticsLoading, setAnalyticsError, setAnalyticsData} = urlAnalyticsSlice.actions;
export const urlAnalyticsReducer = urlAnalyticsSlice.reducer;