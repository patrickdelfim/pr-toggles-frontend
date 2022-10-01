import LoadProjectsService from '@/services/load-project-service'
import { useQuery } from 'react-query'

function useListProject (): any {
  const loadProjectsService = new LoadProjectsService()

  return useQuery('projects', async () => await loadProjectsService.load())
}
export default useListProject
