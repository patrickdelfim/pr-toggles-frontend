import {
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
} from '@chakra-ui/react'
import React from 'react'
const SignUp: React.FC = () => {
  return (
    <Center h="100vh">
      <Box boxSize="sm">
        <Image
          src={'/public/logo_transparent_vector.svg'}
          alt="PR Toggles logo"
        />
      </Box>
      <Box
        padding={8}
        boxShadow="2xl"
        bg="orange.50"
        borderRadius="lg"
        color="black"
        maxW="md"
      >
        <FormControl>
          <FormLabel>Emdsadsadadaadsadsail addressssssss</FormLabel>
          <Input type="email" />
          <FormHelperText>ll never share dsadsayour email.</FormHelperText>
        </FormControl>
      </Box>
    </Center>
  )
}

export default SignUp
