import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodSchema } from "zod";

export const validate = (schema : ZodSchema<any>): RequestHandler => { 
    return (req: Request, res: Response, next: NextFunction): void => {
        const data = { ...req.body, ...req.query, ...req.params };
        const result = schema.safeParse(data);
        if(!result.success){
            res.status(411).json({
                message : "Invalid data"
            });
            return;
        }
        next();
    };
};