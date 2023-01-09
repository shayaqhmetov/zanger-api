import express, { Express, Request, Response } from "express";
import dontenv from "dotenv";

dontenv.config();
import config from "./config/app.config";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running sdasd");
});

app.listen(config.port, () => console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`));