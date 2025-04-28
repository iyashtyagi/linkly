import { eq } from "drizzle-orm"
import { db } from "../config/db"
import { linksTable } from "../models/schema"
import { urlHelper } from "../helpers";
import { randomIdGen } from "../utils";

export const getAllUrlByUser = async (userId : string) => {
    const urlArray = await db.select({
        id : linksTable.id,
        url : linksTable.url,
        slug : linksTable.slug
    }).from(linksTable).where(eq(linksTable.userId, userId));

    return urlArray;
}

export const createNewSlug = async (url : string, userId : string) => {
    let newSlug;
    let exist = true;
    do{
        newSlug = randomIdGen();
        const { isExist } = await urlHelper.getSlugData(newSlug);
        exist = isExist;
    } while(exist);

    const slugData = db.insert(linksTable).values({
        userId,
        url,
        slug : newSlug
    }).returning({
        id : linksTable.id,
        url : linksTable.url,
        slug : linksTable.slug
    });

    return slugData;
}