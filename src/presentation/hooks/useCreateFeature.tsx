import { CreateFeature } from '@/domain/usecases/create-feature'
import { queryClient } from '@/main/routes/router'
import CreateFeatureService from '@/services/create-feature-service'
import { useMutation } from 'react-query'

function useCreateFeature (projectId: number, onSuccessAction, onErrorAction): any {
  const createFeatureService = new CreateFeatureService()

  return useMutation(async (params: CreateFeature.Params) => await createFeatureService.create(params), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['features', `${projectId}`])
      onSuccessAction()
    },
    onError: (error: Error) => {
      onErrorAction(error)
    }
  })
}
export default useCreateFeature
