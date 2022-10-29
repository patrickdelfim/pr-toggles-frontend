import { variacao } from '../models/variacao-model'

export type createFeatureParams = {
  project_id: string
  nome: string
  descricao: string
  valor: string
  variacoes?: variacao[]
}

export interface CreateFeature {
  create: (params: CreateFeature.Params) => Promise<CreateFeature.Model>
}

export namespace CreateFeature {
  export type Params = createFeatureParams
  export type Model = {message: string}
}
