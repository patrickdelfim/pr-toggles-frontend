import { AgregadoModel } from '../models/agregado-model'
import { AgregadoRegras } from '../models/regras-model'

export type createAgregadoParams = {
  projeto_id: number
  nome: string
  descricao?: string
  regras: AgregadoRegras[][]
}
export interface CreateAgregado {
  create: (params: CreateAgregado.Params) => Promise<CreateAgregado.Model>
}

export namespace CreateAgregado {
  export type Model = AgregadoModel
  export type Params = createAgregadoParams
}
