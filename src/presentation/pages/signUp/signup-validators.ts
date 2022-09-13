const signupValidators = {
  nomeEmpresa: {
    required: 'This is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  },
}

export default signupValidators
