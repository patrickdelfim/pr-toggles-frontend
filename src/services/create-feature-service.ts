import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { CreateFeature } from '@/domain/usecases/create-feature'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class CreateFeatureService implements CreateFeature {
  async create (params: CreateFeature.Params): Promise<CreateFeature.Model> {
    console.log('starting create feature service')
    const httpResponse = await makeRequest({
      url: makeApiUrl('/api/funcionalidades'),
      method: 'post',
      body: params,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
// Checkado com ronaldo
