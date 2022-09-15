import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import SignUp from './presentation/pages/accessLayout/signUp/signUp'
import theme from './presentation/styles/theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SignUp />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('main')
)
