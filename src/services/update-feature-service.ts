import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { UpdateFeature } from '@/domain/usecases/update-feature'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class UpdateFeatureService implements UpdateFeature {
  async update (params: UpdateFeature.params): Promise<UpdateFeature.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl(`/api/features/${params.id}`),
      method: 'patch',
      body: params,
    })

    const feature = httpResponse.body?.feature
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign(feature, {
          created_at: new Date(feature.created_at).toLocaleDateString(
            'pt-BR'
          ),
          updated_at: new Date(feature.updated_at).toLocaleDateString(
            'pt-BR'
          )
        })
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
