import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadProjects } from '@/domain/usecases/load-projects'
import { LoadProjectById } from '@/domain/usecases/load-project-by-Id'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class LoadProjectsService implements LoadProjects, LoadProjectById {
  async loadAllByClientId (idCliente: string): Promise<LoadProjects.Model[]> {
    const httpResponse = await makeRequest({
      url: makeApiUrl(`/api/projetos/cliente/${idCliente}`),
      method: 'get',
    })
    const projectList = httpResponse.body || []
    console.log(projectList)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return projectList.map((project) =>
          Object.assign(project, {
            created_at: new Date(project.created_at).toLocaleDateString(
              'pt-BR'
            ),
            updated_at: new Date(project.updated_at).toLocaleDateString(
              'pt-BR'
            ),
            projeto_id: project.id
          })
        )
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }

  async loadByProjectId (projectId: string): Promise<LoadProjects.Model> {
    const httpResponse = await makeRequest({
      url: makeApiUrl(`/api/projetos/${projectId}`),
      method: 'get',
    })
    const project = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign(project, {
          created_at: new Date(project.created_at).toLocaleDateString(
            'pt-BR'
          ),
          updated_at: new Date(project.updated_at).toLocaleDateString(
            'pt-BR'
          ),
          projeto_id: project.id
        })
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
// Checkado com ronaldo
