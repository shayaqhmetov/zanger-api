import _ from "lodash";
import bcrypt from "bcrypt";

import { UserModel } from "../models/users/users.model";
import { IUser } from "../models/users/users.types";
import { BranchModel } from "../models/branches/branches.model";

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
}

export default AuthService.getInstance();