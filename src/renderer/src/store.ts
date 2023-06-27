import _ from "lodash";
import { create } from "zustand";

interface BearState {
  imgArray: Array<File>;
  setImage: (arg0: Array<File>) => void;
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
