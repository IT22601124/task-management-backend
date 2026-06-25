import { NextFunction, Request, Response } from "express";
import { User } from "../database";
import { UserRole } from "../types/user";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError("Authentication token is required", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new AppError("Authenticated user no longer exists", 401);
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Authentication is required", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not authorized to perform this action", 403));
    }

    return next();
  };
