import { CreateOrUpdateEstrategiaHasAgregado } from '@/domain/usecases/create-estrategiaHasAgregado'
// import { queryClient } from '@/main/routes/router'
import CreateOrUpdateStrategyHasAgregadoService from '@/services/createOrUpdate-strategyHasAgregado-service'
import { useMutation } from 'react-query'

function useCreateOrUpdateStrategyHasAgregado (onSuccessAction, onErrorAction): any {
  const createOrUpdateStrategyHasAgregadoService = new CreateOrUpdateStrategyHasAgregadoService()

  return useMutation(async (params: CreateOrUpdateEstrategiaHasAgregado.Params) => await createOrUpdateStrategyHasAgregadoService.createOrUpdate(params), {
    onSuccess: async (newFeature) => {
      // await queryClient.setQueryData(['features', `${newFeature.projeto_id}`], (old: UpdateFeature.Model[]) => old.map(feature => feature.id === newFeature.id ? newFeature : feature))
      onSuccessAction(newFeature.id)
    },
    onError: (error: Error) => {
      onErrorAction(error)
    }
  })
}
export default useCreateOrUpdateStrategyHasAgregado
