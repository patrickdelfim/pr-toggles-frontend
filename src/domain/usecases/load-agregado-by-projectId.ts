import { AgregadoModel } from '../models/agregado-model'

export type loadAgregadoParams = {
  projeto_id: string
}
export interface LoadAgregadoByProjectId {
  loadByProjectId: (projeto_id: string) => Promise<LoadAgregado.Model[]>
}

export namespace LoadAgregado {
  export type Model = AgregadoModel
  export type Params = loadAgregadoParams
}
