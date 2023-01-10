import _ from "lodash";
import bcrypt from "bcrypt";

import { UserModel } from "../models/users/users.model";
import { IUser } from "../models/users/users.types";

export default class AuthService {
  constructor() { }

  public async createUser(params: IUser) {
    const hashedPassword = await bcrypt.hash(params.password, 10);
    return await UserModel.create(_.merge({}, params, { password: hashedPassword }));
  }

  public async getUserByPhone(phoneNumber: string | number) {
    return await UserModel.findOne({ phone: phoneNumber });
  }
}