import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  return successResponse(res, "Registered successfully", result, 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  return successResponse(res, "Logged in successfully", result);
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  return successResponse(res, "Authenticated user fetched successfully", { user: req.user });
});
