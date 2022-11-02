import { AgregadoModel } from '../models/agregado-model'
import { AgregadoRegras } from '../models/regras-model'

export type createAgregadoParams = {
  projeto_id: string
  nome: string
  descricao?: string
  regras: AgregadoRegras[][]
}
export interface createAgregado {
  create: (params: CreateAgregado.params) => Promise<CreateAgregado.Model>
}

export namespace CreateAgregado {
  export type Model = AgregadoModel
  export type params = createAgregadoParams
}
