import { EstrategiaHasAgregadoModel } from '@/domain/models/strategyHasAgregated-model'
import LoadEstrategiaHasAgregadoService from '@/services/load-strategy-has-agregado-service'
import { useQuery } from 'react-query'

function useListStrategyHasAgregado (strategyId: string, onError?): any {
  const loadEstrategiaHasAgregadoService = new LoadEstrategiaHasAgregadoService()
  return useQuery<EstrategiaHasAgregadoModel, Error>(['strategy', `${strategyId}`], async () => await loadEstrategiaHasAgregadoService.loadByStrategyId(strategyId), {
    onError,
  })
}
export default useListStrategyHasAgregado
