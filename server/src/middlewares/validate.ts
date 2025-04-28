import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodSchema } from "zod";
import { BadRequestError } from "../errors";

export const validate = (schema : ZodSchema<any>): RequestHandler => { 
    return (req: Request, res: Response, next: NextFunction): void => {
        const data = { ...req.body, ...req.query, ...req.params };
        const result = schema.safeParse(data);
        if(!result.success){
            return next(new BadRequestError("Invalid data"));
        }
        next();
    };
};