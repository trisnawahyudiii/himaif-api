import fs from "fs";
import path from "path";
import multer from "multer";
import sharp from "sharp";

import { Request, Response, NextFunction } from "express";

const publicDirectory = path.join(__dirname, "../../public");
const uploadDirectory = path.join(publicDirectory, "uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true }); // opsi 'recursive' di set true untuk membuat direktori bertingkat
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

export const upload = multer({ storage, fileFilter });

export const convertToWebP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next();
  }

  const inputPath = path.join(uploadDirectory, req.file.filename);
  const outputPath = path.join(
    uploadDirectory,
    `${req.file.filename.split(".")[0]}.webp`
  );

  try {
    await sharp(inputPath).toFormat("webp").toFile(outputPath);
    req.file.filename = `${req.file.filename.split(".")[0]}.webp`;
    fs.unlinkSync(inputPath); // Remove the original image
    req.file.path = outputPath; // Update the file path to the WebP version
    next();
  } catch (error) {
    return next(error);
  }
};
