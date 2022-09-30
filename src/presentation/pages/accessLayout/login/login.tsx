import { Box, Button, Divider, Text, Link, useToast } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useContext, useEffect } from 'react'

import loginValidators from '@/presentation/validators/login-validators'
import AccessLayoutHeader from '@/presentation/pages/accessLayout/components/header'
import FormContainer from '@/presentation/pages/accessLayout/components/formContainer'
import FormField from '@/presentation/pages/accessLayout/components/formField'
import { AddAccount } from '@/domain/usecases'
import { ApiContext, getCurrentAccount } from '@/presentation/context/api-context'
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

  const makeNewUser: SubmitHandler<AddAccount.Params> = async (values: AddAccount.Params) => {
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
      <FormContainer>
        <form autoComplete="off" onSubmit={handleSubmitForm}>
          <FormField
            fieldName="Endereço de Email"
            fieldKey="email"
            placeholder="you@company.com"
            type="text"
            error={errors.email}
            control={control}
            validators={register('email', validators.email)}
          />
          <FormField
            fieldName="password"
            fieldKey="password"
            placeholder="password"
            type="password"
            error={errors.password}
            control={control}
            validators={register('password', validators.password)}
          />
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
          <Link data-testid="signupBtn" as={RouterDomLink} to='/signup'>Cadastro</Link>
        </Box>
      </FormContainer>
    </Box>
  )
}

export default Login
