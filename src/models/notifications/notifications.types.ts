import { Document, Model } from "mongoose";

export interface INotification {
    time: Date;
    message: string;
}

export interface INotificationDocument extends INotification, Document { }
export interface INotificationModel extends Model<INotificationDocument> { }