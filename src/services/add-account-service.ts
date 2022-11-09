import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class AddAccountService implements AddAccount {
  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl('/api/clientes'),
      method: 'post',
      body: params,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}

// Checkado com ronaldo
