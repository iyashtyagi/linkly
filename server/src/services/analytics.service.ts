import { count, desc, eq, sql } from "drizzle-orm"
import { db } from "../config/db"
import { clicksTable } from "../models/schema"
import { ClickAnalyticsField } from "../types";

export const getAllClickAnalyticOfUrl = async (linkId: string, limit?: number, offset: number = 0) => {
    const baseQuery = db.select().from(clicksTable).where(eq(clicksTable.linkId, linkId)).orderBy(desc(clicksTable.createdAt));
    const query = limit !== undefined ? baseQuery.limit(limit).offset(offset) : baseQuery;
    const data = await query;
    return data;
}

export const getTotalClickCount = async (linkId: string) => {
    const [{ totalClicks }] = await db
        .select({ totalClicks: count()})
        .from(clicksTable)
        .where(eq(clicksTable.linkId, linkId));

    return totalClicks;
}

export const getGroupedAnalytics = async (linkId:string, column: ClickAnalyticsField) => {
    const tableColumn = clicksTable[column];
    const data = await db
        .select({
            label: sql`
                CASE
                    WHEN ${tableColumn} IS NULL OR ${tableColumn} = ''
                    THEN 'Other'
                    ELSE ${tableColumn}
                END
            `,
            count: count()
        })
        .from(clicksTable)
        .where(eq(clicksTable.linkId, linkId))
        .groupBy(tableColumn)
        .orderBy(desc(sql.identifier("count")));

    return data;
}

export const getLastClickDetails = async (linkId: string) => {
    const data = await db
        .select({
            id: clicksTable.id,
            linkId: clicksTable.linkId,
            country: clicksTable.country,
            state: clicksTable.state,
            city: clicksTable.city,
            device: clicksTable.device,
            os: clicksTable.os,
            browser: clicksTable.browser,
            clickType: clicksTable.clickType,
            createdAt: clicksTable.createdAt
        })
        .from(clicksTable)
        .where(eq(clicksTable.linkId, linkId))
        .limit(1);

    return data;
}