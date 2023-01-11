import _ from "lodash";
import jwt from "jsonwebtoken";

import * as config from "../config/app.config";
import { IUserJWTPayload } from "../types";

export const generateAccessToken = (user: IUserJWTPayload) => {
  return jwt.sign(user, config.getAccessKey(), { expiresIn: "15m" });
};

export const generateRefreshToken = (user: IUserJWTPayload) => {
  return jwt.sign(user, config.getRefreshKey(), { expiresIn: "20m" });
};

export const verifyRefresh = (userId: string, token: string) => {
  try {
    const decoded = jwt.verify(token, config.getRefreshKey());
    const expeceted = _.get(decoded, "userId");
    return expeceted === userId;
  } catch (error) {
    return false;
  }
};