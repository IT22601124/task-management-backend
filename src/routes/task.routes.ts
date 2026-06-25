import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createTaskRules,
  listTaskRules,
  taskIdParamRule,
  updateTaskRules
} from "../validators/task.validator";

const router = Router();

router.use(authenticate);

router.get("/", listTaskRules, validate, taskController.index);
router.get("/stats", taskController.stats);
router.get("/:id", taskIdParamRule, validate, taskController.show);
router.post("/", createTaskRules, validate, taskController.store);
router.put("/:id", updateTaskRules, validate, taskController.update);
router.delete("/:id", taskIdParamRule, validate, taskController.destroy);

export default router;
