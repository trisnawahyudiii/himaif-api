import fs from "fs";
import path from "path";
import multer from "multer";

const publicDirectory = path.join(__dirname, "../../public");
const uploadDirectory = path.join(publicDirectory, "uploads");

console.log(uploadDirectory);
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

export const upload = multer({ storage });
