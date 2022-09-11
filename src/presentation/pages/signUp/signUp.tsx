import InputField from '@/presentation/components/input/input'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Text,
  Link,
} from '@chakra-ui/react'
import React from 'react'

import logo from '../../assets/logo_transparent_vector.svg'
const SignUp: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" bg="white">
      <Container>
        <Box display="flex" alignItems="center" flexDirection="column" mt={1}>
          <Image boxSize="200px" src={logo} alt="PR Toggles logo" />
          <Heading fontSize="2xl" fontWeight="700" textAlign="center">
            Experimente nossa versão agratuita..
          </Heading>
          <Text fontSize="md" fontWeight="light" mt={3} textAlign="center">
            Comece a configurar o seu projeto agora mesmo!
          </Text>
        </Box>
      </Container>
      <Box
        width="100%"
        maxW="2xl"
        my={4}
        padding={8}
        boxShadow="2xl"
        bg="bgColor.500"
        borderRadius="lg"
        color="black"
      >
        <Box my={3}>
          <FormControl>
            <FormLabel color="primary.700" fontWeight="600">
              Nome da empresa
            </FormLabel>
            <InputField type="text" placeholder="RB Engenharia" />
          </FormControl>
        </Box>
        <Box my={3}>
          <FormControl>
            <FormLabel color="primary.700" fontWeight="600">
              Endereço de Email
            </FormLabel>
            <InputField type="email" placeholder="you@company.com" />
          </FormControl>
        </Box>
        <Box my={3}>
          <FormControl>
            <FormLabel color="primary.700" fontWeight="600">
              senha
            </FormLabel>
            <InputField type="password" placeholder="password" />
          </FormControl>
        </Box>
        <Box my={3}>
          <FormControl>
            <FormLabel color="primary.600" fontWeight="600">
              confirmação de senha
            </FormLabel>
            <InputField type="password" />
          </FormControl>
        </Box>
        <Box my={3}>
          <FormControl>
            <FormLabel color="primary.600" fontWeight="600">
              Telefone
            </FormLabel>
            <InputField type="tel" placeholder="(xx) xxxx-xxxx" />
          </FormControl>
        </Box>
        <Box mt={5}>
          <Button
            color="white"
            bg="secondary.500"
            w="100%"
            _focus={{ border: 'none' }}
            _hover={{ bg: 'secondary.400' }}
            _active={{ bg: 'secondary.300' }}
          >
            Cadastrar!
          </Button>
        </Box>
        <Box mt={5} display="flex" alignItems="center">
          <Divider borderColor="gray.400" />
          <Text px={5} color="gray.400">
            Ou
          </Text>
          <Divider borderColor="gray.400" />
        </Box>
        <Box mt={3} display="flex" alignItems="center" flexDirection="column">
          <Link color="secondary.500" fontWeight="700">
            Login
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp
