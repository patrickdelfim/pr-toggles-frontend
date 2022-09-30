import { CreateProject } from '@/domain/usecases'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const loginValidators = (
  getValues: UseFormGetValues<CreateProject.Params>
): loginValidatorsProtocol => ({
  name: {
    required: 'Campo obrigatório',
    minLength: {
      value: 4,
      message: 'Campo deve ter no mínimo 4 caracteres.',
    },
    maxLength: {
      value: 50,
      message: 'Campo deve ter no máximo 50 caracteres.',
    },
  },
  description: {
    maxLength: {
      value: 200,
      message: 'Campo deve ter no máximo 200 caracteres.',
    },
  },
})
export default loginValidators

export interface loginValidatorsProtocol {
  name: {
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
  description: {
    maxLength: {
      value: number
      message: string
    }
  }
}
