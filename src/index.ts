import express, { Express } from "express";
import dontenv from "dotenv";
dontenv.config();

import * as config from "./config/app.config";
import { router } from "./routes/";
import Database from "./services/database";

const database = Database.getInstance();
database.connect()
  .then(() => {
    const app: Express = express();

    app.use(express.json());

    app.use("/", router);

    app.listen(config.port, () => console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`));
  }).catch(() => {
    console.log("error");
  });
