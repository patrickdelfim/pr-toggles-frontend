import { AccountModel } from '@/domain/models'

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model | undefined>
}
export namespace Authentication {
  export type Params = {
    email: string
    senha: string
  }
  export type Model = AccountModel
}
