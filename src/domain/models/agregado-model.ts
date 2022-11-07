import { AgregadoRegras } from './regras-model'

export type AgregadoModel = {
  id: number
  projeto_id: number
  nome: string
  descricao?: string
  regras?: AgregadoRegras[][]
  created_at?: string | Date
  updated_at?: string | Date
}
