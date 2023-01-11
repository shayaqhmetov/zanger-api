import { Router } from "express";

import authController from "../controllers/auth.controller";

import { isAuthenticated, isClient } from "../middlewares/auth";
import { handleValidationIssue } from "../middlewares/validator";
import { appointmentValidation, loginValidation, refreshTokenValidation } from "../middlewares/validationRules";
import appointmentController from "../controllers/appointment.controller";

export const router = Router();

router.get("/", (req, res) => {
  return res.send("What's up doc ?!");
});

router.post("/login", loginValidation, handleValidationIssue, authController.login);
router.post("/refresh", refreshTokenValidation, handleValidationIssue, authController.refreshToken);

router.get("/partners", appointmentController.getPartners);
router.post("/appointment", isAuthenticated, isClient, appointmentValidation, handleValidationIssue, appointmentController.createAppointment);

