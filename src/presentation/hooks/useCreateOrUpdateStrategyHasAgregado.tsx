import { CreateOrUpdateEstrategiaHasAgregado } from '@/domain/usecases/create-estrategiaHasAgregado'
import { queryClient } from '@/main/routes/router'
import CreateOrUpdateStrategyHasAgregadoService from '@/services/createOrUpdate-strategyHasAgregado-service'
import { useMutation } from 'react-query'

function useCreateOrUpdateStrategyHasAgregado (estrategiaId: string, onSuccessAction, onErrorAction): any {
  const createOrUpdateStrategyHasAgregadoService = new CreateOrUpdateStrategyHasAgregadoService()

  return useMutation(async (params: CreateOrUpdateEstrategiaHasAgregado.Params) => await createOrUpdateStrategyHasAgregadoService.createOrUpdate(params), {
    onSuccess: async (newFeature) => {
      await queryClient.invalidateQueries(['strategy', `${estrategiaId}`])
      onSuccessAction(newFeature.id)
    },
    onError: (error: Error) => {
      onErrorAction(error)
    }
  })
}
export default useCreateOrUpdateStrategyHasAgregado
