import { body } from "express-validator";
import moment from "moment";

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
    .custom((value) => {
      return moment(value, "YYYY-MM-DD HH:mm", true).isValid();
    })
    .withMessage("next format YYYY-MM-DD hh:mm"),
  body("partner").notEmpty().isString().isLength({ min: 12, max: 32 }),
];
