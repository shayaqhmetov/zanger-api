import _ from "lodash";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import * as config from "../config/app.config";
import { Roles } from "../models/users/users.types";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    let authHeader = _.get(req.headers, "authorization", " ");
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(404).json({ success: false, msg: "Token not found" });
    }
    jwt.verify(token, config.getAccessKey(), (err, user) => {
      if (err) {
        res.status(403).send("Token invalid");
      }
      else {
        req.user = user;
        next();
      }
    });
  } catch (error: any) {
    return res.status(401).json({ success: false, msg: error.message });
  }
};

export const isClient = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== Roles.CLIENT) {
    return res.status(401).json({ success: false, msg: "You do not have access" });
  }
  next();
};
