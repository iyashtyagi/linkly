import { z } from "zod";

export const urlSchema = z.object({
    url : z.string().url("Invalid URL")
})

export type UrlInput = z.infer<typeof urlSchema>;