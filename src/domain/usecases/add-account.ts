import { AccountModel } from '@/domain/models'

export type addAccountParams = {
  nomeEmpresa: string
  email: string
  password: string
  passwordConfirmation: string
  phone: string
}

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AddAccount.Model>
}

export namespace AddAccount {
  export type Params = addAccountParams
  export type Model = AccountModel
}
