import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import expressListEndpoints from "express-list-endpoints";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import createError from "http-errors";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// app config
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static
app.use(express.static(path.join(__dirname, "../public")));

// routes
import { DashboardRouter, AuthRouter } from "./routes";

app.use("/", DashboardRouter);
app.use("/auth", AuthRouter);

// // Get the list of endpoints
// const endpoints = expressListEndpoints(app);

// // Print the list of endpoints
// console.log(endpoints);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
