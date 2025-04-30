import { Router } from "express";
import { redirectController } from "../controllers";

const redirectRouter = Router();

redirectRouter.get("/:slug", async(req , res, next )=>{
    redirectController.redirect(req, res, next);
});

export default redirectRouter;