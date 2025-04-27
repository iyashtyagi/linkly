import { Router } from "express";
import { authController } from "../controllers";
import { validate } from "../middlewares";
import { authValidation } from "../validations";

const authRouter = Router();

authRouter.post("/signin", validate(authValidation.signin), authController.handleSignin);

authRouter.post("/signup", async (req, res) => {
    res.json({
        message : "SignUp"
    });
});

export default authRouter;
