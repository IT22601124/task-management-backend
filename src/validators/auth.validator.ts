import { body } from "express-validator";

export const registerRules = [
  body("name").trim().isLength({ min: 2, max: 120 }).withMessage("Name must be 2-120 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("role").optional().isIn(["admin", "user"]).withMessage("Role must be admin or user")
];

export const loginRules = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
];
