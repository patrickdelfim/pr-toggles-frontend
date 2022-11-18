import { CredentialsModel } from '@/domain/models/projectCredentials-model'
import LoadProjectCredentialsService from '@/services/load-project-credentials-service'
import { useQuery } from 'react-query'

function useListProjectCredentials (projectId: string, onError?): any {
  const loadProjectCredentialService = new LoadProjectCredentialsService()
  return useQuery<CredentialsModel[], Error>(['credentials', `${projectId}`], async () => await loadProjectCredentialService.loadByProjectId(projectId), {
    onError
  })
}
export default useListProjectCredentials
