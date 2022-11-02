import { Box, Button, Divider, Text, Link, useToast } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useContext, useEffect } from 'react'

import loginValidators from '@/presentation/validators/login-validators'
import AccessLayoutHeader from '@/presentation/components/accessLayoutHeader/accessLayoutHeader'
import FormField from '@/presentation/components/formField/formField'
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
      username: '',
      password: '',
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

  const makeNewUser: SubmitHandler<Authentication.Params> = async (
    values: Authentication.Params
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
              fieldKey="username"
              placeholder="you@company.com"
              type="text"
              error={errors.username}
              control={control}
              validators={register('username', validators.username)}
            />
          </Box>
          <Box my={3}>
            <FormField
              fieldName="password"
              fieldKey="password"
              placeholder="senha"
              type="password"
              error={errors.password}
              control={control}
              validators={register('password', validators.password)}
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
