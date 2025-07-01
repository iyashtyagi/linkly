import type { LucideIcon } from "lucide-react";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
}

export interface Url {
    id: string;
    url: string;
    slug: string;
    createdAt: string;
    totalClicks: number;
}

export interface UrlsState {
    urls: Url[];
    loading: boolean;
    error: string | null;
}

export interface faqsType {
    question: string;
    answer: string;
}

export interface featureTypes {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface Testimonials {
    text: string;
    author: string;
    role: string;
}

export interface LabelCount {
    label: string;
    count: number;
}

export interface AnalyticsData {
    byCountry: LabelCount[];
    byState: LabelCount[];
    byCity: LabelCount[];
    byDevice: LabelCount[];
    byBrowser: LabelCount[];
    byOS: LabelCount[];
    byClickType: LabelCount[];
}

export interface UrlMetadata extends Url {
    userId: string;
    totalClicks: number;
}

export interface AnalyticsState {
    urlMetadata: UrlMetadata;
    lastClickDetails: ClickData[];
    analytics: AnalyticsData;
    loading: boolean;
    error: string | null;
}