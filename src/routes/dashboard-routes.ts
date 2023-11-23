import express, { Request, Response } from "express";
const DashboardRouter = express.Router();

DashboardRouter.get("/", function (req: Request, res: Response) {
  console.log("dashboard routes");
  res.render("index", { title: "Himaif Udayana API " });
});

export { DashboardRouter };
