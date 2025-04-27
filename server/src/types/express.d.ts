import { JwtData } from "./auth";

declare global {
    namespace Express {
        interface Request {
            userId? : JwtData["userId"];
        }
    }
}