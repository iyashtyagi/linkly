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