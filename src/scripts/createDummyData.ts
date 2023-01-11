import dotenv from "dotenv";
import { IBranch } from "../models/branches/branches.types";

import { IUser, Roles } from "../models/users/users.types";
import userService from "../services/user.service";
import branchService from "../services/branch.service";
import databaseService from "../services/database.service";

void (async () => {
  dotenv.config();
  await databaseService.connect();
  const branches: IBranch[] = [
    { name: "Административное право" },
    { name: "Гражданское право" },
  ];

  const users: IUser[] = [
    {
      firstName: "Руслан", lastName: "Шаяхметов", middleName: "Санатулы", role: Roles.PARTNER, phone: "87776809599", password: "123123",
    },
    {
      firstName: "Руслан", lastName: "Лобанов", middleName: "Касымович", role: Roles.PARTNER, phone: "87776809591", password: "123123",
    },
    {
      firstName: "Куралай", lastName: "Орманбек", middleName: "Кайраткызы", role: Roles.CLIENT, phone: "87776809592", password: "123123",
    },
    {
      firstName: "Алина", lastName: "Круглова", middleName: "Олеговна", role: Roles.CLIENT, phone: "87776809593", password: "123123",
    },
  ];

  try {
    for (const branch of branches) {
      await branchService.createBranch(branch);
      console.log(`Created branch ${branch.name}`);
    }

    for (const user of users) {
      const createdUser = await userService.createUser(user);
      if (user.role === Roles.PARTNER) {
        const branch = await branchService.getBranch("Административное право");
        if (branch) {
          await userService.addBranch(createdUser._id, branch._id);
        }
      }
      console.log(`Created user ${user.firstName} ${user.lastName}`);
    }
  } catch (e) {
    console.error(e);
  }
  await databaseService.disconnect();
})();