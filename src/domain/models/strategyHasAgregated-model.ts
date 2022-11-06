import { variacao } from './variacao-model'

export type EstrategiaHasAgregadoModel = {
  id?: number
  estrategia_id: number
  agregado_id: string
  ativado: boolean
  valor?: string
  variacoes?: variacao[] // Qual o formato desse json de variações?
  created_at?: string | Date
  updated_at?: string | Date
}
