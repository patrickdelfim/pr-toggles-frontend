import { EstrategiaHasAgregadoModel } from '../models/strategyHasAgregated-model'

export interface LoadStrategyHasAgregadoByStrategyId {
  loadByStrategyId: (strategyId: string) => Promise<LoadStrategyHasAgregadoByStrategyId.Model>
}

export namespace LoadStrategyHasAgregadoByStrategyId {
  export type Model = EstrategiaHasAgregadoModel
}
