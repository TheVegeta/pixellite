import _ from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BearState {
  imgArray: Array<File>;
  setImage: (arg0: Array<File>) => void;
}

interface IAppSetting {
  jpegQuality: number;
  pngQuality: number;
  webpQuality: number;
  savePath: string;

  setQuality: (arg0: {
    jpegQuality: number;
    pngQuality: number;
    webpQuality: number;
    savePath: string;
  }) => void;
}

const setImages: (arg0: Array<File>) => Array<File> = (arg0) => {
  // @ts-ignore
  return _.uniqWith(arg0, ["name", "size"]);
};

export const useAppState = create<BearState>()((set) => ({
  imgArray: [],
  setImage: (imgList) =>
    set((state) => ({
      imgArray: setImages([...state.imgArray, ...imgList]),
    })),
}));

export const useAppSetting = create<IAppSetting>()(
  persist(
    (set) => ({
      jpegQuality: 80,
      pngQuality: 80,
      webpQuality: 60,
      savePath: "",
      setQuality: ({ jpegQuality, pngQuality, savePath, webpQuality }) => {
        set(() => ({ jpegQuality, pngQuality, savePath, webpQuality }));
      },
    }),
    {
      name: "app-setting",
      version: 0.001,
    }
  )
);
