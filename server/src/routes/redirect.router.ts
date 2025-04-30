import { Router } from "express";
import { redirectController } from "../controllers";

const redirectRouter = Router();

redirectRouter.get("/:slug", redirectController.redirect);

export default redirectRouter;