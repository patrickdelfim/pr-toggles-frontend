import { StrategyModel } from './strategy-model'

export type FeatureModel = {
  id: number
  projeto_id: number
  nome: string
  descricao?: string
  ativada_prod?: boolean
  ativada_homolog?: boolean
  ativada_dev?: boolean
  created_at?: string
  updated_at?: string
  estrategias?: StrategyModel[]
}
