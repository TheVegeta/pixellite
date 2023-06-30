import { app } from "electron";
import fs from "fs-extra";
import path from "path";
import sharp from "sharp";

export interface ICompressOptions {
  url: string;
  quality: number;
  outpath: string;
}

export type compressImg = (arg0: ICompressOptions) => Promise<boolean>;

export const compressJpegImg: compressImg = async ({
  url,
  quality,
  outpath,
}) => {
  const picturePath = path.resolve(app.getPath("pictures") + "/pixelLite");

  fs.ensureDirSync(picturePath);

  try {
    const imgBuffer = await sharp(path.resolve(url))
      .jpeg({
        quality,
        optimizeCoding: true,
        mozjpeg: true,
        force: true,
      })
      .toBuffer();

    console.log(path.resolve(picturePath + "/" + Math.random() + ".jpeg"));

    await fs.writeFile(
      path.resolve(picturePath + "/" + Math.random() + ".jpeg"),
      imgBuffer
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
