import { z } from "zod";

export const userIdSchema = z.object({
    userId : z.string().uuid()
});

export const urlIdSchema = z.object({
    urlId : z.string().uuid()
});

export type UrlIdInput = z.infer<typeof urlIdSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;