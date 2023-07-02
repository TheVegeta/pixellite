import { useEffect } from "react";
import AppProvider from "./AppProvider";
import FileInput from "./components/FileInput";
import RenderImage from "./components/RenderImage";
import { useAppSetting } from "./store";

const App = () => {
  const { jpegQuality, pngQuality, savePath, setQuality, webpQuality } =
    useAppSetting();

  useEffect(() => {
    (async () => {
      if (!savePath) {
        const path = await window.api.getDefaultPath();

        setQuality({ jpegQuality, pngQuality, webpQuality, savePath: path });
      }
    })();
  }, [savePath]);

  return (
    <AppProvider>
      <FileInput />
      <RenderImage />
    </AppProvider>
  );
};

export default App;
