import { eq } from "drizzle-orm"
import { db } from "../config/db"
import { clicksTable } from "../models/schema"

export const getAllClickAnalyticOfUrl = async (linkId: string, limit?: number, offset: number = 0) => {
    const query = db.select().from(clicksTable).where(eq(clicksTable.linkId, linkId));
    if (limit !== undefined) {
        query.limit(limit).offset(offset);
    }
    const data = await query;
    return data;
}