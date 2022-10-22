import { CreateFeature } from '@/domain/usecases/create-feature'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const createFeatureValidators = (
  getValues: UseFormGetValues<CreateFeature.Params>
): createFeatureValidatorsProtocol => ({
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
  valor: {
    maxLength: {
      value: 10000,
      message: 'Campo atingiu numero máximo de characteres.',
    },
  },
  variacaoValor: {
    maxLength: {
      value: 10000,
      message: 'Campo atingiu numero máximo de characteres.',
    },
  },
  variacaoPeso: {
    maxLength: {
      value: 3,
      message: 'Campo atingiu numero máximo de characteres.',
    },
    max: {
      value: 100,
      message: 'Valor máximo permitido foi ultrapassado.',
    },
    min: {
      value: 0,
      message: 'Valor mínimo permitido foi ultrapassado.',
    },
  },
})
export default createFeatureValidators

export interface createFeatureValidatorsProtocol {
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
  valor: {
    maxLength: {
      value: number
      message: string
    }
  }
  variacaoValor: {
    maxLength: {
      value: number
      message: string
    }
  }
  variacaoPeso: {
    maxLength: {
      value: number
      message: string
    }
    min: {
      value: number
      message: string
    }
    max: {
      value: number
      message: string
    }
  }
}
