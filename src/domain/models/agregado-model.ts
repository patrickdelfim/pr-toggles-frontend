import { regras } from './regras-model'

export type Agregado = {
  id?: number
  projeto_id?: number
  nome: string
  descricao?: string
  regras?: regras[][]
  created_at?: string | Date
  updated_at?: string | Date
}
