import dotenv from "dotenv";

import { UserModel } from "../models/users/users.model";
import { IUser, Roles } from "../models/users/users.types";
import Database from "../services/database";

(async () => {
    dotenv.config();
    const database = Database.getInstance();
    await database.connect();
    const users: IUser[] = [
        { firstName: "Руслан", lastName: "Шаяхметов", middleName: "Санатулы", role: Roles.CLIENT, phone: "87776809599", password: "123123" },
    ];
    try {
        for (const user of users) {
            // TODO: create user with auth service
            await UserModel.create(user);
            console.log(`Created user ${user.firstName} ${user.lastName}`);
        }
        await database.disconnect();
    } catch (e) {
        console.error(e);
    }
})();