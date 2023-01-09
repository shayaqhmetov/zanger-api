import { UserModel } from "../models/users/users.model";
import { IUser } from "../models/users/users.types";


export default class AuthService {
    constructor() {}

    public async createUser(params: IUser) {
        return await UserModel.create(params);
    }
}