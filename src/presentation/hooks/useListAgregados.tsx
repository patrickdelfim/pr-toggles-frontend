import { AgregadoModel } from '@/domain/models/agregado-model'
import LoadAgregadoService from '@/services/load-agregado-service'
import { useQuery } from 'react-query'

function useListAgregados (projectId: string, onError): any {
  const loadAgregadoService = new LoadAgregadoService()

  return useQuery<AgregadoModel[], Error>(['agregados', `${projectId}`], async () => await loadAgregadoService.loadByProjectId(projectId), {
    onError
  })
}
export default useListAgregados
