import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { CreateProject } from '@/domain/usecases'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class CreateProjectService implements CreateProject {
  async create (params: CreateProject.Params): Promise<CreateProject.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl('/api/projetos'),
      method: 'post',
      body: params,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

// Checkado com ronaldo
