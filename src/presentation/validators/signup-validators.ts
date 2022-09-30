import { AddAccount } from '@/domain/usecases'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const signupValidators = (
  getValues: UseFormGetValues<AddAccount.Params>
): signupValidatorsProtocol => ({
  nomeEmpresa: {
    required: 'Campo obrigatório',
    minLength: {
      value: 4,
      message: 'Campo deve ter mínimo de 4 caracteres.',
    },
    maxLength: {
      value: 100,
      message: 'Campo deve ter no máximo 100 caracteres.',
    },
  },
  email: {
    required: 'Campo obrigatório',
    minLength: {
      value: 4,
      message: 'Campo deve ter no máximo 4 caracteres.',
    },
    maxLength: {
      value: 50,
      message: 'Campo deve ter no máximo 50 caracteres.',
    },
    pattern: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email invalido.',
    },
  },
  password: {
    required: 'Campo obrigatório',
    minLength: {
      value: 8,
      message: 'Campo deve ter mínimo de 8 caracteres.',
    },
    maxLength: {
      value: 12,
      message: 'Campo deve ter no máximo 12 caracteres.',
    },
  },
  passwordConfirmation: {
    required: 'Campo obrigatório',
    minLength: {
      value: 8,
      message: 'Campo deve ter mínimo de 8 caracteres.',
    },
    maxLength: {
      value: 12,
      message: 'Campo deve ter no máximo 12 caracteres.',
    },
    validate: (value: string) =>
      value === getValues('password') || 'password not match!',
  },
  phone: {
    required: 'Campo obrigatório',
    pattern: {
      value:
        /([\(])([0-9]{2})([\)])(\s)([0-9]{5})([\-])?([0-9]{4})/g,
      message: 'Telefone invalido.',
    },
  },
})
export default signupValidators

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
    pattern: {
      value: RegExp
      message: string
    }
  }
}
