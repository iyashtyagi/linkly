import { NextFunction, Request, Response } from "express";
import { analyticService, urlService } from "../services";
import { ClickAnalyticsField } from "../types";
import { toIsoDateInZone } from "../utils/dateTime";

export const getAnalytic = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const urlId = req.params.id;
        const { userId, userTimeZone } = req;
        const { urlData } = await urlService.getUrlDetailsById(urlId, userId!);
        const startDate = toIsoDateInZone(urlData.createdAt, userTimeZone);
        const endDate = toIsoDateInZone(new Date(), userTimeZone);
        const [ totalClicks, lastClickDetails, byCountry, byState, byCity, byDevice, byOS, byClickType, byDateUserTimeZone ] = await Promise.all([
            analyticService.getTotalClickCount(urlData.id),
            analyticService.getLastClickDetails(urlData.id),
            analyticService.getGroupedAnalytics(urlData.id, ClickAnalyticsField.Country),
            analyticService.getGroupedAnalytics(urlData.id, ClickAnalyticsField.State),
            analyticService.getGroupedAnalytics(urlData.id, ClickAnalyticsField.City),
            analyticService.getGroupedAnalytics(urlData.id, ClickAnalyticsField.Device),
            analyticService.getGroupedAnalytics(urlData.id, ClickAnalyticsField.Os),
            analyticService.getGroupedAnalytics(urlData.id, ClickAnalyticsField.ClickType),
            analyticService.getClicksGroupByTimeZone(urlData.id, userTimeZone, startDate, endDate)
        ]);
        
        res.status(200).json({
            success: true,
            data: {
                urlMetadata: {
                    ...urlData,
                    totalClicks
                },
                lastClickDetails: lastClickDetails,
                analytics: {
                    byCountry,
                    byState,
                    byCity,
                    byDevice,
                    byOS,
                    byClickType,
                    byDateUserTimeZone
                }
            },
            message: "Analytics data fetched successfully"
        });

    } catch (error) {
        next(error);
    }
}