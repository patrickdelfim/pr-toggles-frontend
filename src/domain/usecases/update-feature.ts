import { FeatureModel } from '../models/feature-model'
import { variacao } from '../models/variacao-model'

export type updateFeatureParams = {
  id: string
  ativada_prod?: boolean
  ativada_homolog?: boolean
  ativada_dev?: boolean
  descricao?: string
  estrategia?: {
    id: string
    ambiente: string
    valor: string
    variacoes?: variacao[]
  }
}
export interface UpdateFeature {
  update: (params: UpdateFeature.params) => Promise<UpdateFeature.Model>
}

export namespace UpdateFeature {
  export type Model = FeatureModel
  export type params = updateFeatureParams
}
