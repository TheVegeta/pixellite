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

const getFileName = (filePath: string) => {
  return path.basename(filePath);
};

export const getDefaultImagePath = () => {
  return path.resolve(app.getPath("pictures") + "/pixelLite");
};

export const compressJpegImg: compressImg = async ({
  url,
  quality,
  outpath,
}) => {
  fs.ensureDirSync(outpath);

  try {
    const imgBuffer = await sharp(path.resolve(url))
      .jpeg({
        quality,
        optimizeCoding: true,
        mozjpeg: true,
        chromaSubsampling: "4:2:0",
        progressive: true,
      })
      .toBuffer();

    await fs.writeFile(
      path.resolve(outpath + "/" + getFileName(url)),
      imgBuffer
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const compressPngImg: compressImg = async ({
  url,
  quality,
  outpath,
}) => {
  fs.ensureDirSync(outpath);

  try {
    const imgBuffer = await sharp(path.resolve(url))
      .png({
        quality,
        progressive: true,
        colors: 256,
        effort: 0,
      })
      .toBuffer();

    await fs.writeFile(
      path.resolve(outpath + "/" + getFileName(url)),
      imgBuffer
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const compressWebpImg: compressImg = async ({
  url,
  quality,
  outpath,
}) => {
  fs.ensureDirSync(outpath);

  try {
    const imgBuffer = await sharp(path.resolve(url))
      .webp({
        quality,
        force: true,
        nearLossless: true,
        effort: 0,
      })
      .toBuffer();

    await fs.writeFile(
      path.resolve(outpath + "/" + getFileName(url)),
      imgBuffer
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
