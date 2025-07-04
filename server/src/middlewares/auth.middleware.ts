import { NextFunction, Request, Response } from "express";
import { jwtUtil } from "../utils";
import { UnauthorizedError } from "../errors";
import { db } from "../config/db";
import { usersTable } from "../models/schema";
import { eq } from "drizzle-orm";

export const isAuthenticated = async (req : Request, res : Response, next : NextFunction) => {
    const [ bearer, token ] = (req.headers.authorization)?.split(" ") || [];
    
    if(!token || bearer != "Bearer"){
        return next(new UnauthorizedError("Please sign in"));
    }

    const { valid, data } = jwtUtil.verifyToken(token);
    
    if(!valid){
        return next(new UnauthorizedError("Invalid token"));
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.id, data!.userId)).limit(1);
    
    if(!user.length){
        return next(new UnauthorizedError("User doesn't exist"));
    }

    req.userId = user[0].id;
    req.userTimeZone = user[0].timeZone;
    req.userCreatedAt = user[0].createdAt;
    next();
}