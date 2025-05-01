import { Router } from "express";
import authRouter from "./auth.router";
import urlRouter from "./url.router";
import redirectRouter from "./redirect.router";
import analyticsRouter from "./analytics.router";
import { isAuthenticated } from "../middlewares";

const router = Router();

const apiRoutes = [
    { path : "/auth", route : authRouter },
    { path : "/url", route : urlRouter, isProtected : true },
    { path : "/analytics", route : analyticsRouter, isProtected : true }
];

apiRoutes.forEach(({ path, route, isProtected }) => {
    if(isProtected){
        router.use(`/api${path}`, isAuthenticated, route);
    }else{
        router.use(`/api${path}`, route);
    }
});

router.use("/", redirectRouter);

export default router;