import { CreateProject } from '@/domain/usecases'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const createProjectValidators = (
  getValues: UseFormGetValues<CreateProject.Params>
): createProjectValidatorsProtocol => ({
  nome: {
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
  descricao: {
    maxLength: {
      value: 200,
      message: 'Campo deve ter no máximo 200 caracteres.',
    },
  },
})
export default createProjectValidators

export interface createProjectValidatorsProtocol {
  nome: {
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
  descricao: {
    maxLength: {
      value: number
      message: string
    }
  }
}
