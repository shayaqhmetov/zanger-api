import _ from "lodash";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import * as config from "../config/app.config";
import { Roles } from "../models/users/users.types";
import AppError from "../extra/appError";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  let authHeader = _.get(req.headers, "authorization", " ");
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new AppError(400, "Token not found");
  }
  jwt.verify(token, config.getAccessKey(), (err, user) => {
    if (err) {
      throw new AppError(401, "Invalid Token");

    }
    else {
      req.user = user;
      next();
    }
  });
};

export const isClient = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== Roles.CLIENT) {
    throw new AppError(401, "You do not have access");
  }
  next();
};
