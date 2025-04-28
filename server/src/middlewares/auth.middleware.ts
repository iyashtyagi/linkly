import { NextFunction, Request, Response } from "express";
import { jwtUtil } from "../utils";
import { UnauthorizedError } from "../errors";

export const isAuthenticated = (req : Request, res : Response, next : NextFunction) => {
    const [ bearer, token ] = (req.headers.authorization)?.split(" ") || [];
    
    if(!token || bearer != "Bearer"){
        return next(new UnauthorizedError("Please sign in"));
    }

    const { valid, data } = jwtUtil.verifyToken(token);

    if(!valid){
        return next(new UnauthorizedError("Invalid token"));
    }

    req.userId = data!.userId;
    next();
}