import { Document, Model } from "mongoose";

export interface IBranch {
    name: string;
    created?: Date;
}

export interface IBranchDocument extends IBranch, Document { }
export interface IBranchModel extends Model<IBranchDocument> { }