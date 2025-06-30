import type { Url, UrlsState } from "@/types/linkly-type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialUrlsState: UrlsState = {
    urls: [],
    loading: false,
    error: null
}

const urlsSlice = createSlice({
    name: "urls",
    initialState: initialUrlsState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setUrls: (state, action: PayloadAction<Array<Url>>) => {
            state.urls = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addUrl: (state, action: PayloadAction<Url>) => {
            state.urls.push(action.payload);
        },
        removeUrl: (state, action: PayloadAction<string>) => {
            state.urls = state.urls.filter((url: Url) => url.id !== action.payload);
        }
    }
});

export const { setLoading, setUrls, setError, addUrl, removeUrl} = urlsSlice.actions;
export const urlsReducer = urlsSlice.reducer;