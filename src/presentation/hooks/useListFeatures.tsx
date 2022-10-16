import { FeatureModel } from '@/domain/models/feature-model'
import LoadFeatureService from '@/services/load-feature-service'
import { useQuery } from 'react-query'

function useListFeatures (projectId: string, onError?): any {
  const loadFeatureService = new LoadFeatureService()
  return useQuery<FeatureModel[], Error>(['features', `${projectId}`], async () => await loadFeatureService.loadByProjectId(projectId), {
    onError
  })
}
export default useListFeatures
