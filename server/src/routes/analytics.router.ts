import { Router } from "express";
import { analyticsController } from "../controllers";

const analyticsRouter = Router();

analyticsRouter.get("/:id", analyticsController.getAnalytic);

export default analyticsRouter;