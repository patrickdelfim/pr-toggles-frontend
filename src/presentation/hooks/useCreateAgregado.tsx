import { CreateAgregado } from '@/domain/usecases/create-agregado'
import { queryClient } from '@/main/routes/router'
import CreateAgregadoService from '@/services/create-agregado-service'
import { useMutation } from 'react-query'

function useCreateAgregado (projectId: number, onSuccessAction, onErrorAction): any {
  const createAgregadoService = new CreateAgregadoService()

  return useMutation(async (params: CreateAgregado.Params) => await createAgregadoService.create(params), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['agregados', `${projectId}`])
      onSuccessAction()
    },
    onError: (error: Error) => {
      onErrorAction(error)
    }
  })
}
export default useCreateAgregado
