import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import SignUp from './presentation/pages/signUp/signUp'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <SignUp />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('main')
)
