import { JwtData } from "./auth";

declare global {
    namespace Express {
        interface Request {
            userId : string;
            userTimeZone: string;
            userCreatedAt: Date;
        }
    }
}