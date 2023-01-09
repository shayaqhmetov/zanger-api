import express, { Express, Request, Response } from "express";
import dontenv from "dotenv";

dontenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running sdasd");
});

app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));