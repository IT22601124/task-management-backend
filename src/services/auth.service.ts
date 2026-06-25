import { User } from "../database";
import { UserRole } from "../types/user";
import { AppError } from "../utils/AppError";
import { signToken } from "../utils/jwt";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const register = async (payload: RegisterPayload) => {
  const existingUser = await User.findOne({ where: { email: payload.email } });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: payload.role || "user"
  });

  const authUser = user.toSafeJSON();
  const token = signToken(authUser);

  return { user: authUser, token };
};

export const login = async ({ email, password }: LoginPayload) => {
  const user = await User.scope("withPassword").findOne({ where: { email } });

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const authUser = user.toSafeJSON();
  const token = signToken(authUser);

  return { user: authUser, token };
};
