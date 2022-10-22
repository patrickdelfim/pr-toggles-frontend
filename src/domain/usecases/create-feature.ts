import { FeatureModel } from '@/domain/models'

type variacao = {
  valor: string
  peso: string
}

export type createFeatureParams = {
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
  export type Model = FeatureModel
}
