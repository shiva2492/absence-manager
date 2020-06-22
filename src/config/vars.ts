import dotenv from "dotenv";

/**
 *   Load environment variables from .env file, where API keys and passwords are configured
 */
dotenv.config({ path: ".env" });

/**
 * Environment variables
 */
export const env = process.env.NODE_ENV;
export const domain = process.env.DOMAIN;
export const httpScheme = process.env.HTTP_SCHEME;
export const port = process.env.PORT;
export const apiVersion = process.env.API_VERSION;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpireTime = process.env.JWT_EXPIRE_TIME;
export const basePath = "/api/v1";
export const mongodbConnectionURL = process.env.MONGODB_CONNECTION_URL;
export const mongodbURL = process.env.MONGODB_URL;
export const mongodbDatabase = process.env.MONGODB_DATABASE;

export const logs = process.env.NODE_ENV === "production " ? "combined " : "dev";
