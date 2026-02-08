import express, { Application, Request, Response } from "express";
import { SpecialtyRoute } from "./module/specialty/specialty.route";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", SpecialtyRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Healthcare API is running" });
});

export default app;