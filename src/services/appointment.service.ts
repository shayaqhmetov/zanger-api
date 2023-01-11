import { AppointmentModel } from "../models/appointment/appointment.model";
import { IAppointment } from "../models/appointment/appointment.types";

class AppointmentService {
  private static instance: AppointmentService;

  private constructor() { }

  public static getInstance(): AppointmentService {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService();
    }

    return AppointmentService.instance;
  }

  public async createAppointment(params: IAppointment) {
    return await AppointmentModel.create(params);
  }
}

export default AppointmentService.getInstance();