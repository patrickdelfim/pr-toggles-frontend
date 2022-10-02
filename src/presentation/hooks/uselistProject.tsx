import { ProjectModel } from '@/domain/models'
import LoadProjectsService from '@/services/load-project-service'
import { useQuery } from 'react-query'

function useListProject (): any {
  const loadProjectsService = new LoadProjectsService()

  return useQuery<ProjectModel[], Error>('projects', async () => await loadProjectsService.load())
}
export default useListProject
