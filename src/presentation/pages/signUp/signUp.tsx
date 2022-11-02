import { Box, Button, Divider, Text, Link, useToast } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useContext, useEffect } from 'react'

import signupValidators from '@/presentation/validators/signup-validators'
import AccessLayoutHeader from '@/presentation/components/accessLayoutHeader/accessLayoutHeader'
import FormField from '@/presentation/components/formField/formField'
import { AddAccount } from '@/domain/usecases'
import { ApiContext } from '@/presentation/context/api-context'
import { Link as RouterDomLink, useNavigate } from 'react-router-dom'

type Props = {
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ addAccount }: Props) => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AddAccount.Params>({
    defaultValues: {
      nome_cliente: '',
      email: '',
      senha: '',
      confirmacao_senha: '',
      nome_usuario: '',
    },
  })

  useEffect(() => {
    const account = getCurrentAccount()
    if (account?.accessToken) {
      navigate('/panel')
    }
  }, [])
  const toast = useToast()
  const validators = signupValidators(getValues)

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleSubmit(makeNewUser)(event)
  }

  const makeNewUser: SubmitHandler<AddAccount.Params> = async (
    values: AddAccount.Params
  ) => {
    try {
      console.log(values)
      const account = await addAccount.add(values)
      setCurrentAccount(account)
      navigate('/panel')
      // adicionar dados da conta do usuario no storage para autenticar requisições futuras
    } catch (error) {
      toast({
        id: 'signupFormError',
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column" bg="white">
      <AccessLayoutHeader
        title="Experimente nossa versão gratuita..."
        subtitle="Comece a configurar o seu projeto agora mesmo!"
      />
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
              fieldName="Nome da empresa"
              fieldKey="nome_cliente"
              placeholder="RB Engenharia"
              type="text"
              error={errors.nome_cliente}
              control={control}
              validators={register('nome_cliente', validators.nome_cliente)}
            />
          </Box>
          <Box my={3}>
            <FormField
              fieldName="Nome usuario"
              fieldKey="nome_usuario"
              placeholder="nome usuario"
              type="text"
              error={errors.nome_usuario}
              control={control}
              validators={register('nome_usuario', validators.nome_usuario)}

            />
          </Box>
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
          <Box my={3}>
            <FormField
              fieldName="confirmação de senha"
              fieldKey="confirmacao_senha"
              placeholder="senha Confirmation"
              type="senha"
              error={errors.confirmacao_senha}
              control={control}
              validators={register(
                'confirmacao_senha',
                validators.confirmacao_senha
              )}
            />
          </Box>

          <Box mt={5}>
            <Button isLoading={isSubmitting} data-testid="submit" type="submit">
              Cadastrar!
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
          <Link data-testid="loginBtn" as={RouterDomLink} to="/login">
            Login
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp
