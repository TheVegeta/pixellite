import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraProvider theme={theme}> {children}</ChakraProvider>;
};

export default AppProvider;
