import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import AuthService from "../services/auth";
import { isAuthenticated } from "../guards/auth";
import { generateAccessToken, generateRefreshToken, verifyRefresh } from "../utils/crypto";

export const router = Router();

router.get("/", (req, res) => {
  return res.send("What's up doc ?!");
});

// router.post("/refreshToken", (req, res) => {
//   if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
//   refreshTokens = refreshTokens.filter((c) => c != req.body.token)
//   //remove the old refreshToken from the refreshTokens list
//   const accessToken = generateAccessToken({ user: req.body.name })
//   const refreshToken = generateRefreshToken({ user: req.body.name })
//   //generate new accessToken and refreshTokens
//   res.json({ accessToken: accessToken, refreshToken: refreshToken })
// })

router.get("/protected", isAuthenticated, (req, res) => {
  return res.send(req.user);
});

router.post("/login",
  body("phone").isMobilePhone("kk-KZ"),
  body("password").isString().isLength({ min: 5 }).notEmpty(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const auth = new AuthService();
    const user = await auth.getUserByPhone(req.body.phone);
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
  });

router.post("/refresh",
  body("userId").notEmpty().isString(),
  body("role").notEmpty().isString(),
  body("refreshToken").isString().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const { refreshToken, role, userId } = req.body;
    const isValid = verifyRefresh(userId, refreshToken);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid token, try login again" });
    }
    const accessToken = generateAccessToken({ userId, role });
    return res.status(200).json({ success: true, accessToken });
  });