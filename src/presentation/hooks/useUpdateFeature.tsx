import { UpdateFeature } from '@/domain/usecases/update-feature'
import { queryClient } from '@/main/routes/router'
import UpdateFeatureService from '@/services/update-feature-service'
import { useMutation } from 'react-query'

function useUpdateFeature (onSuccessAction, onErrorAction): any {
  const updateFeatureService = new UpdateFeatureService()

  return useMutation(async (params: UpdateFeature.params) => await updateFeatureService.update(params), {
    onSuccess: async (newFeature) => {
      await queryClient.invalidateQueries(['features', `${newFeature.projeto_id}`])
      // await queryClient.setQueryData(['features', `${newFeature.projeto_id}`], (old: UpdateFeature.Model[]) => old.map(feature => feature.id === newFeature.id ? newFeature : feature))
      onSuccessAction(newFeature.id)
    },
    onError: (error: Error) => {
      onErrorAction(error)
    }
  })
}
export default useUpdateFeature
