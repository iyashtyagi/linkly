import { Router } from "express";
import { urlController } from "../controllers";
import { validate } from "../middlewares";
import { urlSchema } from "../validations/url.validator";
import { urlIdSchema } from "../validations/id.validator";

const urlRouter = Router();

// get all the url created by the user
urlRouter.get("/", urlController.getAllUrls);

// create new slug
urlRouter.post("/create", validate(urlSchema), urlController.createNewSlug);

// delete url by id
urlRouter.delete("/:urlId", validate(urlIdSchema), urlController.deleteUrl)

export default urlRouter;