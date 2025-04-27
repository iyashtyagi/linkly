import { z } from "zod";

export const signin = z.object({
    username : z.string().min(3).max(20).trim(),
    password : z.string().min(8).max(32)
});

export const signup = signin.extend({
    firstName : z.string().min(2).max(20).trim(),
    lastName : z.string().min(2).max(20).trim(),
});

export type SignupInput = z.infer<typeof signup>;
export type SigninInput = z.infer<typeof signin>;