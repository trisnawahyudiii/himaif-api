import express, { Request, Response } from "express";
import path from "path";
const DashboardRouter = express.Router();

DashboardRouter.get("/", function (req: Request, res: Response) {
  res.render("index", { title: "Himaif Udayana API " });
});

DashboardRouter.get("/images/:imgName", async (req, res) => {
  const imgPath = path.join(
    __dirname,
    `../../public/uploads/${req.params.imgName}`
  );
  res.download(imgPath);
});

export { DashboardRouter };
