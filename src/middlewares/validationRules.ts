import { body } from "express-validator";

export const loginValidation = [
  body("phone").isMobilePhone("kk-KZ"),
  body("password").notEmpty().isString().isLength({ min: 5 }),
];

export const refreshTokenValidation = [
  body("userId").notEmpty().isString(),
  body("role").notEmpty().isString(),
  body("refreshToken").notEmpty().isString(),
];
export const appointmentValidation = [
  body("title").notEmpty().isString(),
  body("visitDate")
    .notEmpty()
    .isDate()
    .withMessage("next format YYYY/MM/DD"),
  body("client").notEmpty().isString(),
  body("partner").notEmpty().isString(),
];
