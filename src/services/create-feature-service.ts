import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { CreateFeature } from '@/domain/usecases/create-feature'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class CreateFeatureService implements CreateFeature {
  async create (params: CreateFeature.Params): Promise<CreateFeature.Model> {
    console.log('starting create feature service')
    const httpResponse = await makeRequest({
      url: makeApiUrl('/api/feature'),
      method: 'post',
      body: params,
    })
    console.log(httpResponse.body)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
