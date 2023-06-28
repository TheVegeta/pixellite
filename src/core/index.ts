import fs from "fs-extra";
import sharp from "sharp";

interface IOptions {
  url: string;
  quality: number;
  outpath: string;
}

export type compressImg = (arg0: IOptions) => Promise<boolean>;

export const compressJpegImg: compressImg = async ({
  url,
  quality,
  outpath,
}) => {
  console.log(url, quality, outpath);

  return true;
  try {
    const imgBuffer = await sharp(url)
      .jpeg({
        quality,
        optimizeCoding: true,
        mozjpeg: true,
        force: true,
      })
      .toBuffer();

    await fs.writeFile(outpath, imgBuffer);

    return true;
  } catch (err) {
    return false;
  }
};
