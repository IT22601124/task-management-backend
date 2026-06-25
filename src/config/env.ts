import dotenv from "dotenv";

dotenv.config();

const required = ["DB_HOST", "DB_NAME", "DB_USER", "JWT_SECRET"] as const;

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  db: {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT || 3306),
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD || ""
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  },
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173"
};
