import { Request, Response, NextFunction } from "express";
import AppError from "../extra/appError";

export const errorResponder = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction) => {
  response.header("Content-Type", "application/json");
  const status = error.getStatusCode() || 400;
  response.status(status).json({ success: false, msg: error.getMessage() });
};