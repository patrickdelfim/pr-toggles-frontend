import { ProjectModel } from '@/domain/models'
import LoadProjectsService from '@/services/load-project-service'
import { useQuery } from 'react-query'

function useListProjects (onError, idCliente: string): any {
  const loadProjectsService = new LoadProjectsService()

  return useQuery<ProjectModel[], Error>(['projects'], async () => await loadProjectsService.loadAllByClientId(idCliente), {
    onError
  })
}
export default useListProjects
