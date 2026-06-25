import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { AuthUser } from "../types/user";

export const signToken = (user: AuthUser): string => {
  const options: SignOptions = {
    expiresIn: env.jwt.expiresIn
  };

  return jwt.sign(user, env.jwt.secret, options);
};

export const verifyToken = (token: string): AuthUser => {
  return jwt.verify(token, env.jwt.secret) as AuthUser;
};
