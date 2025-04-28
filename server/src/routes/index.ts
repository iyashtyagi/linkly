import { Router } from "express";
import authRouter from "./auth.router";
import urlRouter from "./url.router";
import { isAuthenticated } from "../middlewares";

const router = Router();

const apiRoutes = [
    { path: "/auth", route: authRouter },
    { path: "/url", route: urlRouter, isProtected : true },
];

apiRoutes.forEach(({ path, route, isProtected }) => {
    if(isProtected){
        router.use(`/api${path}`, isAuthenticated, route);
    }else{
        router.use(`/api${path}`, route);
    }
});

export default router;