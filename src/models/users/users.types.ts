import { Document, Model } from "mongoose";

export enum Roles {
    CLIENT = "client",
    PARTNER = "partner",
    ADMIN = "admin",
}

export interface IUser {
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    role: Roles;
    password: string;
    created?: Date;
}

export interface IUserDocument extends IUser, Document { }
export interface IUserModel extends Model<IUserDocument> { }