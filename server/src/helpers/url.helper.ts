import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { linksTable } from "../models/schema";

export const getSlugData = async (slug : string) => {
    const slugData = await db.select().from(linksTable).where(eq(linksTable.slug, slug)).limit(1);

    if(slugData.length){
        return {
            isExist : true,
            data : slugData[0]
        };
    }
    else {
        return {
            isExist : false,
            data : null
        }
    }

}