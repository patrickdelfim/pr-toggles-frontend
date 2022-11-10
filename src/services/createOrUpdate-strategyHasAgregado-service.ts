import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { CreateOrUpdateEstrategiaHasAgregado } from '@/domain/usecases/create-estrategiaHasAgregado'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class CreateOrUpdateStrategyHasAgregadoService implements CreateOrUpdateEstrategiaHasAgregado {
  async createOrUpdate (params: CreateOrUpdateEstrategiaHasAgregado.Params): Promise<CreateOrUpdateEstrategiaHasAgregado.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl('/api/estrategias/hasAgregado'),
      method: 'patch',
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
