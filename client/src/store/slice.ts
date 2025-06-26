import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDecodedUser } from "@/utils";
import type { AuthState, User } from "@/types/linkly-type";

const token = localStorage.getItem("token");
const user = getDecodedUser(token);

const initialAuthState: AuthState = {
    isLoggedIn: !!token && !!user,
    user:  user || null,
    token: token || null
};

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

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;