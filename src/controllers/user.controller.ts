import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";

export const index = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return successResponse(res, "Users fetched successfully", { users });
});
