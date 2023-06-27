import AppProvider from "./AppProvider";
import FileInput from "./components/FileInput";
import RenderImage from "./components/RenderImage";

const App = () => {
  return (
    <AppProvider>
      <FileInput />
      <RenderImage />
    </AppProvider>
  );
};

export default App;
