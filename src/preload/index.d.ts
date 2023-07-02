import { ElectronAPI } from "@electron-toolkit/preload";
import { compressImg } from "../core/index";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      compressJpegImg: compressImg;
      compressPngImg: compressImg;
      compressWebpImg: compressImg;
      getDefaultPath: () => Promise<string>;
    };
  }
}
