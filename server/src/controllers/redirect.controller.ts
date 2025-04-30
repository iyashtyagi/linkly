import { NextFunction, Request, Response } from "express";
import { trackingService, urlService } from "../services";
import { saveClick } from "../services/tracking.service";
import { NotFoundError } from "../errors";


export const redirect = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const timestamp = new Date();
        const slug = req.params.slug.toLowerCase();
        const { data } = await urlService.isValidSlug(slug);
        if(!data?.url){
            next(new NotFoundError("Link doesn't exist"));
            return;
        }
        
        res.status(302).redirect(data.url);

        const { ipData } = await trackingService.getIpData(req);
        const { deviceData } = trackingService.getDeviceData(req);
        await saveClick(data.linkId, ipData, deviceData, timestamp);
        return;
    } catch (error) {
        next(error);
    }
};
