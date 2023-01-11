import { model } from "mongoose";

import { IAppointmentDocument } from "./appointment.types";
import AppointmentSchema from "./appointment.schema";

export const AppointmentModel = model<IAppointmentDocument>("appointment", AppointmentSchema);