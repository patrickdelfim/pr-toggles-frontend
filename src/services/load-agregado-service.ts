import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadAgregado, LoadAgregadoByProjectId } from '@/domain/usecases/load-agregado-by-projectId'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class LoadAgregadoService implements LoadAgregadoByProjectId {
  async loadByProjectId (projectId: string): Promise<LoadAgregado.Model[]> {
    const httpResponse = await makeRequest({
      url: makeApiUrl(`/api/agregados/projeto/${projectId}`),
      method: 'get',
    })
    const agregadoList = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return agregadoList.map((feature) => Object.assign(feature, {
          created_at: new Date(feature.created_at).toLocaleDateString(
            'pt-BR'
          ),
          updated_at: new Date(feature.updated_at).toLocaleDateString(
            'pt-BR'
          )
        }))
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.notFound:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}

// Checkado com ronaldo
