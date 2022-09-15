export type FormInputs = {
  nomeEmpresa: string
  email: string
  password: string
  passwordConfirmation: string
  phone: string
}

export interface signupValidatorsProtocol {
  nomeEmpresa: {
    required: string
    minLength: {
      value: number
      message: string
    }
    maxLength: {
      value: number
      message: string
    }
  }
  email: {
    required: string
    minLength: {
      value: number
      message: string
    }
    maxLength: {
      value: number
      message: string
    }
    pattern: {
      value: RegExp
      message: string
    }
  }
  password: {
    required: string
    minLength: {
      value: number
      message: string
    }
    maxLength: {
      value: number
      message: string
    }
  }
  passwordConfirmation: {
    required: string
    minLength: {
      value: number
      message: string
    }
    maxLength: {
      value: number
      message: string
    }
    validate: (value: string) => boolean | string
  }
  phone: {
    required: string
    minLength: {
      value: number
      message: string
    }
  }
}
