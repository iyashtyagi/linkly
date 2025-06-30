import { jwtDecode } from "jwt-decode";
import type { User } from "@/types/linkly-type";
import { toast } from "sonner";

export function getDecodedUser(token: string | null): User | null {
    if (!token) return null;

    try {
        const {user} = jwtDecode(token) as {user: User};
        return user;
    } catch (err) {
        console.error("Invalid token", err);
        return null;
    }
};

export const handleCopy = async (slug: string) => {
    try {
        await navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
        toast.success("URL copied to clipboard!");
    } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to copy URL");
    }
};

export const backendUrl = import.meta.env.VITE_BASE_URL;
export * from "./content";