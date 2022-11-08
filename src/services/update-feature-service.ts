import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { UpdateFeature } from '@/domain/usecases/update-feature'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class UpdateFeatureService implements UpdateFeature {
  async update (params: UpdateFeature.params): Promise<UpdateFeature.Model> {
    const { estrategia, ...rest } = params

    const httpFeatureUpdateResponse = await makeRequest({
      url: makeApiUrl(`/api/funcionalidades/${params.id}`),
      method: 'patch',
      body: rest,
    })

    if (estrategia) {
      await makeRequest({
        url: makeApiUrl(`/api/estrategias/${estrategia.id}`),
        method: 'patch',
        body: estrategia,
      })
    }

    const feature = httpFeatureUpdateResponse.body
    switch (httpFeatureUpdateResponse.statusCode) {
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
// Checkado com ronaldo
