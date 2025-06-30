import type { UrlAnalytics } from "@/types/linkly-type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialAnalyticsState: UrlAnalytics = {
    urlMetadata: {
        id: "",
        url: "",
        slug: "",
        totalClicks: 0,
        clicksData: [],
        createdAt: ""
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
            state.urlMetadata = action.payload;
        }
    }
});

export const { setAnalyticsLoading, setAnalyticsError, setAnalyticsData} = urlAnalyticsSlice.actions;
export const urlAnalyticsReducer = urlAnalyticsSlice.reducer;