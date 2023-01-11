import { Document, Model } from "mongoose";
import { IUser } from "../users/users.types";

export interface IAppointment {
    title: string;
    visitDate: Date;
    client: IUser;
    partner: IUser;
    created?: Date;
}

export interface IAppointmentDocument extends IAppointment, Document { }
export interface IAppointmentModel extends Model<IAppointmentDocument> { }