import { NextFunction, Request, Response } from "express";
import { urlService } from "../services";
import { UnauthorizedError } from "../errors";

export const getAllUrls = async (req : Request, res : Response, next : NextFunction) => {
    const userId = req.userId;
    if(!userId){
        return next(new UnauthorizedError("Please log in or sign up"));
    }

    const urlsArray = await urlService.getAllUrlByUser(userId);

    res.status(200).json({ 
        data : urlsArray
    });
};

export const createNewSlug = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const userId = req.userId;
        const url : string = req.body.url;
        if(!userId){
            return next(new UnauthorizedError("Please log in or sign up"));
        }
    
        const newSlug = await urlService.createNewSlug(url, userId);

        res.status(201).json({
            data : newSlug
        })
    }
    catch(err : any){
        next(err);
    }
}