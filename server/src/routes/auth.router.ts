import { Router } from "express";
import { authController } from "../controllers";
import { isAuthenticated, validate } from "../middlewares";
import { authValidation } from "../validations";

const authRouter = Router();

authRouter.get("/verify", isAuthenticated, authController.verifyToken);

authRouter.post("/signin", validate(authValidation.signin), authController.handleSignin);

authRouter.post("/signup", validate(authValidation.signup), authController.handleSignup);

export default authRouter;
