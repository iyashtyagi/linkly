import { DateTime } from "luxon";

export function toIsoDateInZone( value: Date | string, zone: string ): string {
    let dt;
    if( typeof value === "string"){
        dt = DateTime.fromISO(value, {zone: "UTC" });
    } else {
        dt = DateTime.fromJSDate(value, {zone: "UTC"});
    }
    return dt.setZone(zone).toFormat("yyyy-MM-dd");
}