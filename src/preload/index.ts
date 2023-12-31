import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
  compressJpegImg: (arg0: any) => ipcRenderer.invoke("compressJpegImg", arg0),
  compressPngImg: (arg0: any) => ipcRenderer.invoke("compressPngImg", arg0),
  compressWebpImg: (arg0: any) => ipcRenderer.invoke("compressWebpImg", arg0),
  getDefaultPath: () => ipcRenderer.invoke("getDefaultPath"),
  getDirPath: () => ipcRenderer.invoke("getDirPath"),
};

contextBridge.exposeInMainWorld("electron", electronAPI);
contextBridge.exposeInMainWorld("api", api);

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld("electron", electronAPI);
//     contextBridge.exposeInMainWorld("api", api);
//   } catch (error) {
//     console.error(error);
//   }
// } else {
//   // @ts-ignore (define in dts)
//   window.electron = electronAPI;
//   // @ts-ignore (define in dts)
//   window.api = api;
// }
