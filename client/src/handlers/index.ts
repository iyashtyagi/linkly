import axios, { AxiosError } from "axios";
import type { AppDispatch } from "@/store/store";
import {
    addUrl,
    login,
    logout,
    removeUrl,
    setLoading,
    setUrls,
    setAnalyticsLoading,
    setAnalyticsError,
    setAnalyticsData
} from "@/store/features";
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

export const handleVerifyUser = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await api.get("/auth/verify");
            if(response.status !== 200){
                throw new Error();
            }
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            dispatch(logout());
            toast.error(error.response?.data.message || "Please login again");
        } finally {
            dispatch(setLoading(false));
        }
    }
}

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

export const handleFetchUrls = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await api.get(`/url`);
            dispatch(setUrls(response.data.data));
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            if (err.response?.status === 401) {
                dispatch(logout());
            }
            throw new Error(err.response?.data?.message || "Failed to fetch URLs");
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const handleDeleteUrl = (urlId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await api.delete(`/url/${urlId}`);
            dispatch(removeUrl(urlId));
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            throw new Error(err.response?.data?.message || "Failed to delete URL");
        }
    };
};

export const handleFetchUrlDetails = (urlId: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setAnalyticsLoading(true));

        try {
            const response = await api.get(`/analytics/${urlId}`);
            const { urlMetadata, lastClickDetails, analytics } = response.data.data;

            dispatch(setAnalyticsData({urlMetadata, lastClickDetails, analytics}));
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            if (err.response?.status === 401) {
                dispatch(logout());
                return;
            }
            const errorMessage = err.response?.data?.message || "Failed to fetch URL details";
            dispatch(setAnalyticsError(errorMessage));
        } finally {
        dispatch(setAnalyticsLoading(false));
        }
    };
};