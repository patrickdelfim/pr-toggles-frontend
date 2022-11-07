import { CreateOrUpdateEstrategiaHasAgregado } from '@/domain/usecases/create-estrategiaHasAgregado'
import { UseFormGetValues } from 'react-hook-form'

/* eslint-disable no-useless-escape */
const updateStrategyHasAgregadoValidators = (
  getValues: UseFormGetValues<CreateOrUpdateEstrategiaHasAgregado.Params>
): updateStrategyHasAgregadoValidatorsProtocol => ({
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
export default updateStrategyHasAgregadoValidators

export interface updateStrategyHasAgregadoValidatorsProtocol {
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
