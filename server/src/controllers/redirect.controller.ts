import { NextFunction, Request, Response } from "express";
import { trackingService, urlService } from "../services";
import { saveClick } from "../services/tracking.service";
import { NotFoundError } from "../errors";


export const redirect = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const timestamp = new Date();
        const slug = req.params.slug.toLowerCase();
        const qr = req.query.qr;
        const clickType = qr !== undefined ? "qr" : null;
        const { data } = await urlService.isValidSlug(slug);
        if(!data?.url){
            next(new NotFoundError("Link doesn't exist"));
            return;
        }
        
        res.status(302).redirect(data.url);

        const { ipData } = await trackingService.getIpData(req);
        const { deviceData } = trackingService.getDeviceData(req);
        if(deviceData.browser === undefined || deviceData.browser === null){
            return;
        }
        await saveClick(data.linkId, ipData, deviceData, timestamp, clickType);
        return;
    } catch (error) {
        next(error);
    }
};
