import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BiError } from 'react-icons/bi'
type props = {
  error: Error
}

const ApiError: React.FC<props> = ({ error }: props) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p="10">
      <VStack spacing={4}>
        <BiError size={200} color="gray.300"/>
        <Heading>Oops!</Heading>
        <Text fontSize="xl">{error.message}</Text>
      </VStack>
    </Box>
  )
}

export default ApiError
