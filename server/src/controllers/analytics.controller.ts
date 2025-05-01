import { NextFunction, Request, Response } from "express";
import { analyticService, urlService } from "../services";

export const getAnalytic = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const urlId = req.params.id;
        const userId = req.userId;
        const { urlData } = await urlService.getUrlDetailsById(urlId, userId!);
        const clicksData = await analyticService.getAllClickAnalyticOfUrl(urlData.id);
        res.status(200).json({
            clicksData
        });
    } catch (error) {
        next(error);
    }
}