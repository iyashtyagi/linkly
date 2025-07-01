import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if(err instanceof CustomError){
        res.status(err.statusCode).json({ message : err.message });
        return;
    }

    res.status(500).json({ message : "Something went wrong"});
};
