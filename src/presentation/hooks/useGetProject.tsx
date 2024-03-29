import { ProjectModel } from '@/domain/models'
import LoadProjectsService from '@/services/load-project-service'
import { useQuery } from 'react-query'

function useGetProject (projectId: string, initialData?, onError?): any {
  const loadProjectsService = new LoadProjectsService()

  return useQuery<ProjectModel, Error>(['projects', `${projectId}`], async () => await loadProjectsService.loadByProjectId(projectId), {
    initialData,
    retry: 2,
    onError
  })
}
export default useGetProject
