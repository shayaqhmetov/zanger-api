import { NO_SECRET } from "../constants/errors";

export const getAccessKey = () => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw Error(NO_SECRET);
  }
  return secret;
};

export const getRefreshKey = () => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw Error(NO_SECRET);
  }
  return secret;
};

export const port = process.env.NODE_LOCAL_PORT;