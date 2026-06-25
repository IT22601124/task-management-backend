import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200,
  meta?: Record<string, unknown>
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {})
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 500,
  errors?: unknown
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {})
  });
};
