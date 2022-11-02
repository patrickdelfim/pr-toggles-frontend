import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AddAccount, Authentication } from '@/domain/usecases'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class AuthService implements Authentication {
  async auth (params: Authentication.Params): Promise<AddAccount.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl('/api/auth/login'),
      method: 'post',
      body: params,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
// Checkado com ronaldo
