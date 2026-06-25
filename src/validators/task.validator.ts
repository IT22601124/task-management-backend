import { body, param, query } from "express-validator";

export const taskIdParamRule = [param("id").isInt({ min: 1 }).withMessage("Task id must be valid")];

export const listTaskRules = [
  query("title").optional().trim().isLength({ min: 1 }),
  query("priority").optional().isIn(["low", "medium", "high"]),
  query("status").optional().isIn(["open", "in_progress", "testing", "done"]),
  query("due_date").optional().isISO8601().toDate(),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("sortBy").optional().isIn(["id", "title", "priority", "status", "due_date", "created_at", "updated_at"]),
  query("sortOrder").optional().isIn(["ASC", "DESC", "asc", "desc"])
];

export const createTaskRules = [
  body("title").trim().isLength({ min: 3, max: 180 }).withMessage("Title must be 3-180 characters"),
  body("description").optional({ nullable: true }).trim(),
  body("priority").optional().isIn(["low", "medium", "high"]),
  body("status").optional().isIn(["open", "in_progress", "testing", "done"]),
  body("due_date").optional({ nullable: true }).isISO8601().withMessage("Due date must be a valid date"),
  body("assigned_to").optional({ nullable: true }).isInt({ min: 1 }).withMessage("Assignee must be valid")
];

export const updateTaskRules = [
  ...taskIdParamRule,
  body("title").optional().trim().isLength({ min: 3, max: 180 }),
  body("description").optional({ nullable: true }).trim(),
  body("priority").optional().isIn(["low", "medium", "high"]),
  body("status").optional().isIn(["open", "in_progress", "testing", "done"]),
  body("due_date").optional({ nullable: true }).isISO8601(),
  body("assigned_to").optional({ nullable: true }).isInt({ min: 1 })
];
