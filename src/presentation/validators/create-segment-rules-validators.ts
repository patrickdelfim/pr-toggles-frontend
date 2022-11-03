import { CreateFeature } from '@/domain/usecases/create-feature'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const createSegmentRulesValidation = (
  getValues: UseFormGetValues<CreateFeature.Params>
): createSegmentRulesValidatorsProtocol => ({
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
    pattern: {
      value:
        /^[^\s]*$/,
      message: 'Nome não pode conter espaços.',
    },
  },
  descricao: {
    maxLength: {
      value: 200,
      message: 'Campo deve ter no máximo 200 caracteres.',
    },
  },
  key: {
    required: 'Campo Chave obrigatório',
    maxLength: {
      value: 200,
      message: 'Campo Chave atingiu numero máximo de characteres.',
    },
  },
  operator: {
    required: 'Campo Operator obrigatório',
  },
  value: {
    required: 'Campo Value obrigatório',
    maxLength: {
      value: 200,
      message: 'Campo Value atingiu numero máximo de characteres.',
    },
  },
})
export default createSegmentRulesValidation

export interface createSegmentRulesValidatorsProtocol {
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
    pattern: {
      value: RegExp
      message: string
    }
  }
  descricao: {
    maxLength: {
      value: number
      message: string
    }
  }
  key: {
    required: string
    maxLength: {
      value: number
      message: string
    }
  }
  operator: {
    required: string
  }
  value: {
    required: string
    maxLength: {
      value: number
      message: string
    }
  }
}
