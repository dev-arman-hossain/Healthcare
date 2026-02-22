import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import { IndexRoutes } from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", IndexRoutes);

app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Healthcare API is running" });
});

export default app;