import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadProjects } from '@/domain/usecases/load-projects'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class LoadProjectsService implements LoadProjects {
  async load (): Promise<LoadProjects.Model[]> {
    const httpResponse = await makeRequest({
      url: makeApiUrl('/api/projects/'),
      method: 'get',
    })
    const projectList = httpResponse.body?.projects || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return projectList.map((project) =>
          Object.assign(project, {
            created_at: new Date(project.created_at).toLocaleDateString(
              'pt-BR'
            ),
            updated_at: new Date(project.updated_at).toLocaleDateString(
              'pt-BR'
            )
          })
        )
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }

  async loadById (projectId: string): Promise<LoadProjects.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl(`/api/projects/${projectId}`),
      method: 'get',
    })
    const project = httpResponse.body?.project
    console.log(project)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign(project, {
          created_at: new Date(project.created_at).toLocaleDateString(
            'pt-BR'
          ),
          updated_at: new Date(project.updated_at).toLocaleDateString(
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
