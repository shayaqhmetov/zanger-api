import bcrypt from "bcrypt";
import { Request, Response } from "express";

import authService from "../services/user.service";
import { generateAccessToken, generateRefreshToken, verifyRefresh } from "../utils/crypto";

class AuthController {
  private static instance: AuthController;

  private constructor() { }

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }

    return AuthController.instance;
  }

  public refreshToken(req: Request, res: Response) {
    const { refreshToken, role, userId } = req.body;
    const isValid = verifyRefresh(userId, refreshToken);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid token, try login again" });
    }
    const accessToken = generateAccessToken({ userId, role });
    return res.status(200).json({ success: true, accessToken });
  }

  public async login(req: Request, res: Response) {
    const user = await authService.getUserByPhone(req.body.phone);
    if (!user) {
      return res.status(404).send("User does not exist!");
    }
    //if user does not exist, send a 400 response
    const password = user.password;
    if (await bcrypt.compare(req.body.password, password)) {
      const accessToken = generateAccessToken({ userId: user._id, role: user.role });
      const refreshToken = generateRefreshToken({ userId: user._id, role: user.role });
      return res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
    return res.status(401).send("Password Incorrect!");
  }
}

export default AuthController.getInstance();