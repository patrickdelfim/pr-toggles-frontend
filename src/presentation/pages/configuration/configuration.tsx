import { useErrorHandler } from '@/presentation/hooks/use-error-handler'
import useListProjectCredentials from '@/presentation/hooks/useListProjectCredentiais'
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,

  Input,

  Text,

  useToast,
} from '@chakra-ui/react'
import React from 'react'

import { useParams } from 'react-router-dom'

const Configuration: React.FC = () => {
  const toast = useToast()
  const params = useParams()
  const onError = useErrorHandler(() => {
    toast({
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
  })

  const { data, isLoading, isError, error } = useListProjectCredentials(params.id, onError)
  return (
    <>
    {isLoading || isError
      ? ''
      : (
      <Container maxW="4xl" mt={20}>
        <Box
          pb="2"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bg="secondary.500"
            minW={'full'}
            height="40px"
            borderRadius="lg"
            borderBottomRadius="0"
          >
            <Text
              px="4"
              color="white"
              fontWeight="bold"
              size="sm"
              letterSpacing={1.1}
            >
              Credenciais de utilização:
            </Text>
          </Box>
          <Box w={'100%'} p={4} boxShadow="2xl" bg="gray.100" borderRadius="lg">
            <FormControl pb={2}>
              <FormLabel>Desenvolvimento:</FormLabel>
                <Input type="text" isReadOnly value={data.find(value => value.ambiente === 'dev').id} />

              <FormHelperText>
                Credenciais do ambiente de desenvolvimento.
              </FormHelperText>
            </FormControl>
            <FormControl pb={2}>
              <FormLabel>Homolog:</FormLabel>

                <Input type="text" isReadOnly value={data.find(value => value.ambiente === 'homolog').id} />

              <FormHelperText>
                Credenciais do ambiente de Homolog.
              </FormHelperText>
            </FormControl>
            <FormControl pb={2}>
              <FormLabel>Produção:</FormLabel>
                <Input type="text" isReadOnly value={data.find(value => value.ambiente === 'prod').id} />

              <FormHelperText>
                Credenciais do ambiente de Produção.
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>
      </Container>
        )}
    </>
  )
}

export default Configuration
