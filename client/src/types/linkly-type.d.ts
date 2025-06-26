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

export interface ClickData {
    id: string;
    linkId: string;
    ip: string;
    country: string;
    state: string;
    city: string;
    device: string;
    deviceVendor: string;
    os: string;
    browser: string;
    referrer: string | null;
    clickType: string | null;
    createdAt: string;
}

export interface Url {
    id: string;
    url: string;
    slug: string;
    createdAt: string;
    totalClicks: number;
    clicksData: ClickData[]
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
