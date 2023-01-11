import express, { Express, Request, Response, NextFunction } from "express";
import dontenv from "dotenv";
dontenv.config();

import * as config from "./config/app.config";
import { router } from "./routes/";
import databaseService from "./services/database.service";
import { errorResponder } from "./middlewares/error";
import { errorLogger, requestLogger } from "./middlewares/logging";
import JobService from "./services/job.service";

const app: Express = express();
app.use(express.json());
app.use(requestLogger);

databaseService.connect()
  .then(() => {
    JobService.getInstance().then(() => console.log("⚡️[server]: All notifications scheduled"));
    app.use("/", router);
    app.use(errorLogger);
    app.use(errorResponder);
    app.listen(config.port, () => console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`));
  }).catch(() => {
    console.log("error");
  });
