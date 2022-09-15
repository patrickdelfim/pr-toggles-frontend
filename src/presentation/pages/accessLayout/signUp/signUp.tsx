import { Box, Button, Divider, Text, Link } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import React from 'react'

import signupValidators from './signup-validators'
import { FormInputs } from './signUp-protocols'
import AccessLayoutHeader from '../components/header'
import FormContainer from '../components/formContainer'
import FormField from '../components/formField'

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      nomeEmpresa: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      phone: '',
    },
  })

  const validators = signupValidators(getValues)

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleSubmit(makeNewUser)(event)
  }

  const makeNewUser: SubmitHandler<FormInputs> = (values: FormInputs) => {
    console.log(values)
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column" bg="white">
      <AccessLayoutHeader />
      <FormContainer>
        <form autoComplete="off" onSubmit={handleSubmitForm}>
          <FormField
            fieldName="Nome da empresa"
            fieldKey="nomeEmpresa"
            placeholder="RB Engenharia"
            type="text"
            error={errors.nomeEmpresa}
            control={control}
            validators={register('nomeEmpresa', validators.nomeEmpresa)}
          />
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
          <FormField
            fieldName="confirmação de senha"
            fieldKey="passwordConfirmation"
            placeholder="password Confirmation"
            type="password"
            error={errors.passwordConfirmation}
            control={control}
            validators={register(
              'passwordConfirmation',
              validators.passwordConfirmation
            )}
          />

          <FormField
            fieldName="Telefone"
            fieldKey="phone"
            placeholder="(xx) xxxx-xxxx"
            type="tel"
            error={errors.phone}
            control={control}
            validators={register('phone', validators.phone)}
            mask="(99) 99999-9999"
          />
          <Box mt={5}>
            <Button isLoading={isSubmitting} type="submit">
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
          <Link>Login</Link>
        </Box>
      </FormContainer>
    </Box>
  )
}

export default SignUp
