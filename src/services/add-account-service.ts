import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class addAccountService implements AddAccount {
  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl('/cadastro'),
      method: 'post',
      body: params,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
