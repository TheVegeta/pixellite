import { ChakraProvider } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraProvider> {children}</ChakraProvider>
}

export default AppProvider
