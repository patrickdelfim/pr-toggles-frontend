import { Authentication } from '@/domain/usecases'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const loginValidators = (
  getValues: UseFormGetValues<Authentication.Params>
): loginValidatorsProtocol => ({
  email: {
    required: 'Campo obrigatório',
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
      message: 'Email invalido.',
    },
  },
  password: {
    required: 'Campo obrigatório',
  },
})
export default loginValidators

export interface loginValidatorsProtocol {
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
  }
}
