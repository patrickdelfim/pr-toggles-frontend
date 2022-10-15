import { FeatureModel } from '../models/feature-model'

export interface LoadFeaturesByProjectId {
  loadByProjectId: (projectId: string) => Promise<LoadFeaturesByProjectId.Model>
}

export namespace LoadFeaturesByProjectId {
  export type Model = FeatureModel[]
}
