import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import React from 'react'

import logo from '../../assets/logo_transparent_vector.svg'
const SignUp: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box display="flex" alignItems="center" flexDirection="column" mt={10}>
        <Image boxSize="200px" src={logo} alt="PR Toggles logo" />
        <Heading fontSize="2xl" fontWeight="700">
          Experimente nossa versão gratuita.
        </Heading>
        <Text fontSize="md" fontWeight="light" mt={3}>
          Comece a configurar o seu projeto agora mesmo!
        </Text>
      </Box>
      <Box
        width="100%"
        maxW="2xl"
        mt={10}
        padding={8}
        boxShadow="2xl"
        bg="orange.50"
        borderRadius="lg"
        color="black"
      >
        <Box my={3}>
          <FormControl>
            <FormLabel>Nome da empresa</FormLabel>
            <Input type="text" placeholder="RB Engenharia" />
          </FormControl>
        </Box>
        <Box my={3}>
          <FormControl>
            <FormLabel>Endereço de Email</FormLabel>
            <Input type="email" placeholder="you@company.com" />
          </FormControl>
        </Box>
        <Box my={3}>
          <FormControl>
            <FormLabel>senha</FormLabel>
            <Input type="password" placeholder="password" />
          </FormControl>
        </Box>
        <Box my={3}>
          <FormControl>
            <FormLabel>confirmação de senha</FormLabel>
            <Input type="password" placeholder="" />
          </FormControl>
        </Box>
        <Box my={3}>
          <FormControl>
            <FormLabel>Telefone</FormLabel>
            <Input type="tel" placeholder="(xx) xxxx-xxxx" />
          </FormControl>
        </Box>
        <Box mt={5}>
          <Button colorScheme="blue" w="100%">
            Cadastrar!
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp
