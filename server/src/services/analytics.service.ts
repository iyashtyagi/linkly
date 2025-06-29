import { desc, eq } from "drizzle-orm"
import { db } from "../config/db"
import { clicksTable } from "../models/schema"

export const getAllClickAnalyticOfUrl = async (linkId: string, limit?: number, offset: number = 0) => {
    const baseQuery = db.select().from(clicksTable).where(eq(clicksTable.linkId, linkId)).orderBy(desc(clicksTable.createdAt));
    const query = limit !== undefined ? baseQuery.limit(limit).offset(offset) : baseQuery;
    const data = await query;
    return data;
}