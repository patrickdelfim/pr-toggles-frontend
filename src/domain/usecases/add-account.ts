import { AccountModel } from '@/domain/models'

export type addAccountParams = {
  nome_cliente: string
  nome_usuario: string
  email: string
  senha: string
  confirmacao_senha: string
}

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AddAccount.Model>
}

export namespace AddAccount {
  export type Params = addAccountParams
  export type Model = AccountModel
}
