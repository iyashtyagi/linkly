import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDecodedUser } from "@/utils";
import type { AuthState, Url, UrlsState, User } from "@/types/linkly-type";

const token = localStorage.getItem("token");
const user = getDecodedUser(token);

const initialAuthState: AuthState = {
    isLoggedIn: !!token && !!user,
    user:  user || null,
    token: token || null
};

const initialUrlsState: UrlsState = {
    urls: [],
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }
    }
});

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

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const { setLoading, setUrls, setError, addUrl, removeUrl} = urlsSlice.actions;
export const urlsReducer = urlsSlice.reducer;