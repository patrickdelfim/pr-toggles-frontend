import { UpdateFeature } from '@/domain/usecases/update-feature'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const updateFeatureValidators = (
  getValues: UseFormGetValues<UpdateFeature.params>
): updateFeatureValidatorsProtocol => ({
  descricao: {
    maxLength: {
      value: 200,
      message: 'Campo deve ter no máximo 200 caracteres.',
    },
  },
  valor: {
    required: 'Campo obrigatório',
    maxLength: {
      value: 10000,
      message: 'Campo atingiu numero máximo de characteres.',
    },
  },
  variacaoValor: {
    required: 'Campo obrigatório',
    maxLength: {
      value: 10000,
      message: 'Campo atingiu numero máximo de characteres.',
    },
  },
  variacaoPeso: {
    required: 'Campo obrigatório',
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
export default updateFeatureValidators

export interface updateFeatureValidatorsProtocol {
  descricao: {
    maxLength: {
      value: number
      message: string
    }
  }
  valor: {
    required: string
    maxLength: {
      value: number
      message: string
    }
  }
  variacaoValor: {
    required: string
    maxLength: {
      value: number
      message: string
    }
  }
  variacaoPeso: {
    required: string
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
