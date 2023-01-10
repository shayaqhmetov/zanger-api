import dotenv from "dotenv";

import { IUser, Roles } from "../models/users/users.types";
import AuthService from "../services/auth";
import Database from "../services/database";

void (async () => {
  dotenv.config();
  const database = Database.getInstance();
  const authService = new AuthService();
  await database.connect();
  const users: IUser[] = [{ firstName: "Руслан", lastName: "Шаяхметов", middleName: "Санатулы", role: Roles.CLIENT, phone: "87776809599", password: "123123" }];
  try {
    for (const user of users) {
      await authService.createUser(user);
      console.log(`Created user ${user.firstName} ${user.lastName}`);
    }
  } catch (e) {
    console.error(e);
  }
  await database.disconnect();
})();