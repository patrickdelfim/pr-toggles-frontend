import { Authentication } from '@/domain/usecases'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const loginValidators = (
  getValues: UseFormGetValues<Authentication.Params>
): loginValidatorsProtocol => ({
  username: {
    required: 'Campo obrigatório',
    minLength: {
      value: 4,
      message: 'Campo deve ter no mínimo 4 caracteres.',
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
  },
})
export default loginValidators

export interface loginValidatorsProtocol {
  username: {
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
  }
}
