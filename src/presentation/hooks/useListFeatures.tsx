import { FeatureModel } from '@/domain/models/feature-model'
import LoadFeatureService from '@/services/load-feature-service'
import { useQuery } from 'react-query'

function useListFeatures (projectId, onError?): any {
  const loadFeatureService = new LoadFeatureService()
  console.log('loading features')
  return useQuery<FeatureModel[], Error>(['features', projectId], async () => await loadFeatureService.loadByProjectId(projectId), {
    onError
  })
}
export default useListFeatures
