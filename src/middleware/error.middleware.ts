import { ErrorRequestHandler } from "express";
import { BaseError, ValidationError } from "sequelize";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";
import { errorResponse } from "../utils/response";

export const notFoundHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  return errorResponse(res, err.message || "Route not found", 404);
};

export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode);
  }

  if (err instanceof ValidationError) {
    return errorResponse(
      res,
      "Database validation failed",
      422,
      err.errors.map((item) => ({ field: item.path, message: item.message }))
    );
  }

  if (err instanceof BaseError) {
    return errorResponse(res, "Database error", 500);
  }

  const message = env.nodeEnv === "production" ? "Internal server error" : err.message;
  return errorResponse(res, message || "Internal server error", 500);
};
