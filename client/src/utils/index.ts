import { jwtDecode } from "jwt-decode";
import type { User } from "@/types/linkly-type";

export function getDecodedUser(token: string | null): User | null {
    if (!token) return null;

    try {
        return jwtDecode<User>(token);
    } catch (err) {
        console.error("Invalid token", err);
        return null;
    }
};
export const backendUrl = import.meta.env.VITE_BASE_URL;

export * from "./content";