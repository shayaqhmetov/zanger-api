import { NextFunction, Request, Response } from "express";
import AppError from "../extra/appError";
import { AppointmentModel } from "../models/appointment/appointment.model";
import { UserModel } from "../models/users/users.model";
import { Roles } from "../models/users/users.types";
import { UserBranchProjection, UserProjection } from "../projections";
import appointmentService from "../services/appointment.service";

class AppointmentController {
  private static instance: AppointmentController;

  private constructor() { }

  public static getInstance(): AppointmentController {
    if (!AppointmentController.instance) {
      AppointmentController.instance = new AppointmentController();
    }

    return AppointmentController.instance;
  }

  public async getPartners(req: Request, res: Response, next: NextFunction) {
    try {
      const partners = await UserModel.find({ role: Roles.PARTNER }, UserProjection).populate("branches", UserBranchProjection);
      return res.status(200).json(partners);
    } catch (err: any) {
      return next(new AppError(500, err.message));
    }
  }

  public async createAppointment(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.user;
    const { partner, title, visitDate } = req.body;
    try {
      const appointment = await appointmentService.createAppointment(title, visitDate, userId, partner);
      return res.status(200).json(appointment);
    } catch (err: any) {
      return next(new AppError(500, err.message));
    }
  }
}

export default AppointmentController.getInstance();