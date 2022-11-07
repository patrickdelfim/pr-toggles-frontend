import { EstrategiaHasAgregadoModel } from '../models/strategyHasAgregated-model'
import { variacao } from '../models/variacao-model'

export type createOrUpdateEstrategiaHasAgregadoParams = {
  estrategia_id: string
  agregado_id: string
  ativado: boolean
  valor: string
  variacoes?: variacao[]
}
export interface CreateOrUpdateEstrategiaHasAgregado {
  createOrUpdate: (params: CreateOrUpdateEstrategiaHasAgregado.Params) => Promise<CreateOrUpdateEstrategiaHasAgregado.Model>
}

export namespace CreateOrUpdateEstrategiaHasAgregado {
  export type Model = EstrategiaHasAgregadoModel
  export type Params = createOrUpdateEstrategiaHasAgregadoParams
}
