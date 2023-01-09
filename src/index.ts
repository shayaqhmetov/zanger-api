import express, { Express, Request, Response } from "express";
import dontenv from "dotenv";
import mongoose from "mongoose";


import config from "./config/app.config";
import dbConfig from "./config/db.config";

dontenv.config();

const app: Express = express();
mongoose.connect(dbConfig.url, () => console.log("⚡️[database]: Database is running"))

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running sdasd");
});

app.listen(config.port, () => console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`));