import { variacao } from './variacao-model'

export type StrategyModel = {
  id?: string
  funcionalidade_id: number
  ambiente: string
  valor?: string
  variacoes?: variacao[]
  created_at?: string | Date
  updated_at?: string | Date
  estrategia_has_agregado?: any // AJUSTAR ESSE ANY E COLOCAR TIPO CORRETO
}
