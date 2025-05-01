import { and, eq } from "drizzle-orm"
import { db } from "../config/db"
import { linksTable } from "../models/schema"
import { urlHelper } from "../helpers";
import { randomIdGen } from "../utils";
import { NotFoundError } from "../errors";

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

export const isValidSlug = async (slug : string) => {
    const slugFromDB = await db.select({
        url : linksTable.url,
        linkId : linksTable.id
    }).from(linksTable).where(eq(linksTable.slug, slug)).limit(1);

    if(slugFromDB[0]){
        return {
            data : slugFromDB[0]
        };
    }
    return {
        data : null
    };
}

export const getUrlDetailsById = async ( urlId : string, userId : string ) => {
    const data = await db.select()
        .from(linksTable)
        .where(and(eq(linksTable.id, urlId), eq(linksTable.userId, userId)))
        .limit(1);
    if(!data.length){
        throw new NotFoundError("No URL found for the given ID.");
    }
    return {
        urlData : data[0]
    };
};