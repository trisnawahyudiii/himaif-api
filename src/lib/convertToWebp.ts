import fs from "fs";
import path from "path";
import sharp from "sharp";

export const convertToWebp = async (filename: string) => {
  const directory = path.join(__dirname, "../../public/uploads");
  const resultName = filename.split(".")[0];

  sharp(`${directory}/${filename}`).toFile(
    `${directory}/${resultName}.webp`,
    (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Image converted to WebP successfully:", info);
      }
    }
  );

  // delete the old file
  fs.unlinkSync(`${directory}/${filename}`);

  const returnResult = `${resultName}.webp`;
  return returnResult;
};
