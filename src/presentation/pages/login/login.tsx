import { Box, Button, Divider, Text, Link, useToast } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useContext, useEffect } from 'react'

import loginValidators from '@/presentation/validators/login-validators'
import AccessLayoutHeader from '@/presentation/components/accessLayoutHeader/accessLayoutHeader'
import FormField from '@/presentation/components/formField/formField'
import { AddAccount } from '@/domain/usecases'
import {
  ApiContext,
  getCurrentAccount,
} from '@/presentation/context/api-context'
import { Link as RouterDomLink, useNavigate } from 'react-router-dom'
import { Authentication } from '@/domain/usecases/authentication'

type Props = {
  authentication: Authentication
}

const Login: React.FC<Props> = ({ authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Authentication.Params>({
    defaultValues: {
      email: '',
      senha: '',
    },
  })

  useEffect(() => {
    const account = getCurrentAccount()
    if (account?.accessToken) {
      navigate('/panel')
    }
  }, [])

  const toast = useToast()

  const validators = loginValidators(getValues)

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleSubmit(makeNewUser)(event)
  }

  const makeNewUser: SubmitHandler<AddAccount.Params> = async (
    values: AddAccount.Params
  ) => {
    try {
      console.log(values)
      const account = await authentication.auth(values)
      setCurrentAccount(account)
      navigate('/panel')
    } catch (error) {
      console.log(error)
      toast({
        id: 'loginFormError',
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column" bg="white">
      <AccessLayoutHeader title="Login" />
      <Box
        width="100%"
        maxW="2xl"
        my={4}
        padding={8}
        boxShadow="2xl"
        bg="gray.100"
        borderRadius="lg"
      >
        <form autoComplete="off" onSubmit={handleSubmitForm}>
          <Box my={3}>
            <FormField
              fieldName="Endereço de Email"
              fieldKey="email"
              placeholder="you@company.com"
              type="text"
              error={errors.email}
              control={control}
              validators={register('email', validators.email)}
            />
          </Box>
          <Box my={3}>
            <FormField
              fieldName="senha"
              fieldKey="senha"
              placeholder="senha"
              type="senha"
              error={errors.senha}
              control={control}
              validators={register('senha', validators.senha)}
            />
          </Box>
          <Box mt={5}>
            <Button isLoading={isSubmitting} data-testid="submit" type="submit">
              Login!
            </Button>
          </Box>
        </form>
        <Box mt={5} display="flex" alignItems="center">
          <Divider borderColor="gray.400" />
          <Text px={5} color="gray.400">
            Ou
          </Text>
          <Divider borderColor="gray.400" />
        </Box>
        <Box mt={3} display="flex" alignItems="center" flexDirection="column">
          <Link data-testid="signupBtn" as={RouterDomLink} to="/cliente">
            Cadastro
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
