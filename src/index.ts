import * as bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response, urlencoded } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { ApiError } from "./errors";
import {
  adminRouter,
  authRouter,
  carRouter,
  premiumRouter,
  userRouter,
} from "./routers";

const app = express();
app.use(cors());

// app.use(express.json());
const jsonParser = bodyParser.json();
const textParser = bodyParser.text();

app.use(jsonParser);
app.use(textParser);

app.use(urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/auth", authRouter);
app.use("/cars", carRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/premium", premiumRouter);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Server error";

  res.status(status).json({ error: message });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);

  console.log("Server is runnig...", configs.PORT);
});
