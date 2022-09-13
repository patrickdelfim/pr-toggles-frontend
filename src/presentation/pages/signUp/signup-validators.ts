/* eslint-disable no-useless-escape */
const signupValidators = (getValues): any => ({
  nomeEmpresa: {
    required: 'This is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
    maxLength: {
      value: 100,
      message: 'Minimum length should be 100',
    },
  },
  email: {
    required: 'This is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
    maxLength: {
      value: 50,
      message: 'Minimum length should be 50',
    },
    pattern: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email Invalid.',
    },
  },
  password: {
    required: 'This is required',
    minLength: {
      value: 8,
      message: 'Minimum length should be 8',
    },
    maxLength: {
      value: 12,
      message: 'Minimum length should be 12',
    },
  },
  passwordConfirmation: {
    required: 'This is required',
    minLength: {
      value: 8,
      message: 'Minimum length should be 8',
    },
    maxLength: {
      value: 12,
      message: 'Minimum length should be 12',
    },
    validate: (value: string) =>
      value === getValues('password') || 'password not match!',
  },
  phone: {
    required: 'This is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  },
})

export default signupValidators
