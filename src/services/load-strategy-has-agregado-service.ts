import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadStrategyHasAgregadoByStrategyId } from '@/domain/usecases/load-strategy-has-agregado-by-strategyId'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class LoadEstrategiaHasAgregadoService implements LoadStrategyHasAgregadoByStrategyId {
  async loadByStrategyId (strategyId: string): Promise<LoadStrategyHasAgregadoByStrategyId.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl(`/api/estrategias/${strategyId}/agregados`),
      method: 'get',
    })
    const estrategiaHasAgregado = httpResponse.body
    console.log('estrategiaHasAgregado:', estrategiaHasAgregado)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign(estrategiaHasAgregado, {
          created_at: new Date(estrategiaHasAgregado.created_at).toLocaleDateString(
            'pt-BR'
          ),
          updated_at: new Date(estrategiaHasAgregado.updated_at).toLocaleDateString(
            'pt-BR'
          )
        })
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.notFound:
        return null
      default:
        throw new UnexpectedError()
    }
  }
}
