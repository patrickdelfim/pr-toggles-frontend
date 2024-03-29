import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadProjectCredentialByProjectId } from '@/domain/usecases/load-projectCredentials-by-projectsId'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class LoadProjectCredentialsService implements LoadProjectCredentialByProjectId {
  async loadByProjectId (projectId: string): Promise<LoadProjectCredentialByProjectId.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl(`/api/chaves/projeto/${projectId}`),
      method: 'get',
    })
    const credentialList = httpResponse.body
    if (httpResponse.body?.length === 0) throw new UnexpectedError()
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return credentialList.map((feature) => Object.assign(feature, {
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
      default:
        throw new UnexpectedError()
    }
  }
}

// Checkado com ronaldo
