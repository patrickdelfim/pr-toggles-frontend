import { Box } from '@chakra-ui/react'
import React from 'react'

const FormContainer: React.FC = ({ children }) => {
  return (
    <Box
      width="100%"
      maxW="2xl"
      my={4}
      padding={8}
      boxShadow="2xl"
      bg="bgContainer"
      borderRadius="lg"
    >
      {children}
    </Box>
  )
}

export default FormContainer
