import { Request, Response } from "express";
import { authValidation } from "../validations";
import { authService } from "../services/";

export const handleSignin = async (req : Request, res : Response) => {
    const { username, password } : authValidation.SigninInput = req.body;
    try {
        const token = await authService.signin({ username, password });
        res.status(200).json({
            success : true,
            message : "Signin successful",
            token
        });
    }
    catch(error: any){
        res.status(400).json({
            success : false,
            message : error.message || "Signin failed"
        });
    }
};