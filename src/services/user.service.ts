import _ from "lodash";
import bcrypt from "bcrypt";

import { UserModel } from "../models/users/users.model";
import { IUser, Roles } from "../models/users/users.types";
import { BranchModel } from "../models/branches/branches.model";
import AppError from "../extra/appError";

class AuthService {
  private static instance: AuthService;

  private constructor() { }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async createUser(params: IUser) {
    const hashedPassword = await bcrypt.hash(params.password, 10);
    return await UserModel.create(_.merge({}, params, { password: hashedPassword }));
  }

  public async addBranch(userId: string, branchId: string) {
    await UserModel.updateOne({ "_id": userId }, { $push: { branches: branchId } });
    await BranchModel.updateOne({ "_id": branchId }, { $push: { users: userId } });
  }

  public async getUserByPhone(phoneNumber: string | number) {
    return await UserModel.findOne({ phone: phoneNumber });
  }

  public async getPartnerById(userId: string) {
    const partner = await UserModel.findOne({ _id: userId, role: Roles.PARTNER });
    if (!partner) {
      throw new Error("No such partner");
    }
    return partner;
  }

  public async getClientById(userId: string) {
    const client = await UserModel.findOne({ _id: userId, role: Roles.CLIENT });
    if (!client) {
      throw new AppError(404, "Client not exists");
    }
    return client;
  }
}

export default AuthService.getInstance();