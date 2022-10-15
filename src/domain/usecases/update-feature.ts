import { FeatureModel } from '../models/feature-model'
export type updateFeatureParams = {
  feature_id: string
  ativada_prod?: boolean
  ativada_homolog?: boolean
  ativada_dev?: boolean
}
export interface UpdateFeature {
  update: (params: UpdateFeature.params) => Promise<UpdateFeature.Model>
}

export namespace UpdateFeature {
  export type Model = FeatureModel
  export type params = updateFeatureParams
}
