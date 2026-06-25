import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, "Validation failed", 422, errors.array());
  }

  return next();
};
