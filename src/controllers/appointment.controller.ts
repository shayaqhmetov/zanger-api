import { Request, Response } from "express";
import { UserModel } from "../models/users/users.model";
import { Roles } from "../models/users/users.types";
import { UserBranchProjection, UserProjection } from "../projections";

class AppointmentController {
  private static instance: AppointmentController;

  private constructor() { }

  public static getInstance(): AppointmentController {
    if (!AppointmentController.instance) {
      AppointmentController.instance = new AppointmentController();
    }

    return AppointmentController.instance;
  }

  public async getPartners(req: Request, res: Response) {
    const partners = await UserModel.find({ role: Roles.PARTNER }, UserProjection).populate("branches", UserBranchProjection);
    return res.status(200).json(partners);
  }

  public createAppointment(req: Request, res: Response) {
    res.status(200).json(req.body);
  }
}

export default AppointmentController.getInstance();