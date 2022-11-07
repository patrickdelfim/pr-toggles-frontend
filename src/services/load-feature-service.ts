import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadFeaturesByProjectId } from '@/domain/usecases/load-features-by-projectsId'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class LoadFeatureService implements LoadFeaturesByProjectId {
  async loadByProjectId (projectId: string): Promise<LoadFeaturesByProjectId.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl(`/api/projects/${projectId}/features`),
      method: 'get',
    })
    const featureList = httpResponse.body?.features || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return featureList.map((feature) => Object.assign(feature, {
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
