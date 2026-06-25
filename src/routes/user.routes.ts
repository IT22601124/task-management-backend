import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, authorize("admin"), userController.index);

export default router;
