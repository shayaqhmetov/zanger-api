import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction) => {
  console.log(`${request.method} url:: ${request.url}`);
  next();
};

export const errorLogger = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction) => {
  console.log(`error ${error.message}`);
  next(error);
};