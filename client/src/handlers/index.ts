import axios, { AxiosError } from "axios";
import type { AppDispatch } from "@/store/store";
import {
    addUrl,
    login,
    logout,
    setLoading,
} from "@/store/slice";
import { backendUrl } from "@/utils";
import type { User } from "@/types/linkly-type";
import { toast } from "sonner";

interface ApiErrorResponse {
    message: string;
    status?: number;
}

export const api = axios.create({
    baseURL: backendUrl,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const handleSignup = async (
    data: { firstName: string; lastName: string; username: string; password: string }
): Promise<void> => {
    try {
        await api.post(`/auth/signup`, data);
    } catch (error) {
        const err = error as AxiosError<ApiErrorResponse>;
        throw new Error(err.response?.data?.message || "Signup failed");
    }
};

export const handleLogin = async (
    dispatch: AppDispatch,
    data: { username: string; password: string }
): Promise<User | void> => {
    try {
        const response = await api.post("/auth/signin", data);
        dispatch(
            login({
                user: response.data.user,
                token: response.data.token,
            })
        );
        return response.data.user;
    } catch (error) {
        const err = error as AxiosError<ApiErrorResponse>;
        throw new Error(err.response?.data?.message || "Login failed");
    }
};

export const handleLogout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(logout());
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            toast.error(err.response?.data?.message || "Failed to logout");
        }
    };
};

export const handleShortenUrl = (data: { url: string }) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await api.post(`/url/create`, data);
            dispatch(addUrl(response.data.data));
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            throw new Error(err.response?.data?.message || "Failed to shorten URL");
        } finally {
            dispatch(setLoading(false));
        }
    };
};