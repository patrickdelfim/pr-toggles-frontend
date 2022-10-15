export type StrategyModel = {
  id?: number
  funcionalidade_id: number
  ambiente: string
  valor?: string
  variacoes?: string
  created_at?: string | Date
  updated_at?: string | Date
  estrategia_has_agregado?: any // AJUSTAR ESSE ANY E COLOCAR TIPO CORRETO
}
