import { Request, Response } from "express";
import * as taskService from "../services/task.service";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";

const getAuthUser = (req: Request) => {
  if (!req.user) {
    throw new AppError("Authentication is required", 401);
  }

  return req.user;
};

export const index = asyncHandler(async (req: Request, res: Response) => {
  const result = await taskService.getTasks(req.query as Record<string, string | undefined>, getAuthUser(req));
  return successResponse(res, "Tasks fetched successfully", { tasks: result.tasks }, 200, {
    pagination: result.pagination
  });
});

export const stats = asyncHandler(async (req: Request, res: Response) => {
  const result = await taskService.getTaskStats(getAuthUser(req));
  return successResponse(res, "Task statistics fetched successfully", result);
});

export const show = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(Number(req.params.id), getAuthUser(req));
  return successResponse(res, "Task fetched successfully", { task });
});

export const store = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body, getAuthUser(req));
  return successResponse(res, "Task created successfully", { task }, 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.updateTask(Number(req.params.id), req.body, getAuthUser(req));
  return successResponse(res, "Task updated successfully", { task });
});

export const destroy = asyncHandler(async (req: Request, res: Response) => {
  await taskService.deleteTask(Number(req.params.id), getAuthUser(req));
  return successResponse(res, "Task deleted successfully", null);
});
