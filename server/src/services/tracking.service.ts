import axios from "axios";
import { Request } from "express";
import { UAParser } from "ua-parser-js";
import { DeviceInfoData, IpInfoData } from "../types";
import { IP_INFO_TOKEN } from "../config/ipInfoConfig";
import { clicksTable } from "../models/schema";
import { db } from "../config/db";

export const getIpData = async (req : Request) => {
    try {
        const ipAddress = req.headers['x-real-ip'] || req.socket.remoteAddress;
        const ipSearchResult = (await axios.get(`https://ipinfo.io/${ipAddress}/json?token=${IP_INFO_TOKEN}`)).data;
        const [latitude, longitude]:string = ipSearchResult.loc.split(",") || '';

        const ipData : IpInfoData = {
            ip : ipSearchResult.ip,
            city : ipSearchResult.city,
            state : ipSearchResult.region,
            country : ipSearchResult.country,
            latitude,
            longitude
        };

        return {
            ipData
        };

    }catch(err){
        return {
            ipData : {
                ip : '',
                city : '',
                state : '',
                country : '',
                latitude : '',
                longitude : ''
            }
        }
    }
 
}

export const getDeviceData = (req : Request) => {
    const parsedUA = UAParser(req.headers["user-agent"]);

    const deviceData : DeviceInfoData = {
        uaAgent : (req.headers["user-agent"]),
        browser : parsedUA.browser.name,
        device : parsedUA.device.type || "desktop",
        deviceVendor : parsedUA.device.vendor,
        os : parsedUA.os.name
    };

    return {
        deviceData
    };  
}

export const saveClick = async (linkId : string, ipData : IpInfoData, deviceData : DeviceInfoData, timestamp : Date, clickType: string | null) => {
    await db.insert(clicksTable).values({
        linkId,
        ip : ipData.ip,
        city : ipData.city,
        state : ipData.state,
        country : ipData.country,
        latitude : ipData.latitude,
        longitude : ipData.longitude,
        userAgent : deviceData.uaAgent,
        browser : deviceData.browser,
        os : deviceData.os,
        device : deviceData.device,
        deviceVendor : deviceData.deviceVendor,
        clickType: clickType,
        createdAt : timestamp
    });
}