import express, { Express } from "express";
import dontenv from "dotenv";
dontenv.config();

import * as config from "./config/app.config";
import { router } from "./routes/";
import databaseService from "./services/database.service";

const app: Express = express();
app.use(express.json());

databaseService.connect()
  .then(() => {
    app.use("/", router);
    app.listen(config.port, () => console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`));
  }).catch(() => {
    console.log("error");
  });
