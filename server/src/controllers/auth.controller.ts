import { NextFunction, Request, Response } from "express";
import { authValidation } from "../validations";
import { authService } from "../services";

export const handleSignin = async (req : Request, res : Response, next : NextFunction) => {
    const { username, password } : authValidation.SigninInput = req.body;
    try {
        const { token, user } = await authService.signin({ username, password });
        res.status(200).json({
            success : true,
            message : "Signin successful",
            user,
            token
        });
    }
    catch(error: any){
        next(error);
    }
};

export const handleSignup = async (req : Request, res : Response, next : NextFunction) => {
    const { username, password, firstName, lastName } : authValidation.SignupInput = req.body;
    try{
        const user = await authService.signup({ username, password, firstName, lastName });
        res.status(201).json({
            success : true,
            message : "Signup successful",
            user
        })
    }
    catch(error : any){
        next(error);
    }
};

export const verifyToken = async (req: Request, res: Response) => {
    res.status(200).json({
        success : true,
        message : "Verified user"
    });
}