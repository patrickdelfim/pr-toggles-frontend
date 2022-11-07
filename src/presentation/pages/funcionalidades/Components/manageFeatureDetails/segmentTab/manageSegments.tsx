import React, { useEffect, useState } from 'react'
import { Box, Button, Select, Spinner, Text, useBoolean, useToast } from '@chakra-ui/react'
import AgregadoManagement from './agregadoManagement/agregadoManagement'
import useListAgregados from '@/presentation/hooks/useListAgregados'
import { useParams } from 'react-router-dom'
import UpdateSegmentForm from './updateSegmentForm'
import { StrategyModel } from '@/domain/models/strategy-model'
import useListStrategyHasAgregado from '@/presentation/hooks/useListStrategyHasAgregado'

type props = {
  estrategia: StrategyModel | null
  onClose: () => void
}

const ManageSegments: React.FC<props> = ({ estrategia, onClose }: props) => {
  const [flag, setFlag] = useBoolean()
  const [selectedAgregado, setAgregado] = useState('')
  const params = useParams()
  const toast = useToast()
  const onError = async (error: Error): Promise<void> => {
    toast({
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
  }
  const { data, status } = useListAgregados(params.id, onError)
  const { data: strategyHasAggData, status: strategyHasAggStatus } = useListStrategyHasAgregado(estrategia.id)

  useEffect(() => {
    if (strategyHasAggData && data) {
      console.log('strategyHasAggData: ', strategyHasAggData)
      const defaultAgregado = data.find(agregado => agregado.id === strategyHasAggData.agregado_id)
      setAgregado(`${defaultAgregado.id as string},${defaultAgregado.nome as string}`)
    }
  }, [strategyHasAggStatus])

  const handleSegmentSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setAgregado(e.target.value)
  }
  if (flag) {
    return (
      <Box>
        <AgregadoManagement cancelAddAgregadoAction={setFlag.off}/>
      </Box>
    )
  } else {
    return (
      <Box>
        <Text pt={4} fontWeight="bold">
          Gerencie valores de segmentos:
          </Text>
          {status === 'loading' || strategyHasAggStatus === 'loading'
            ? (<Box display="flex" alignItems="center" justifyContent="center" mt={10}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
              </Box>)
            : (<>
            <Select placeholder='Selecione o Segmento' value={selectedAgregado} onChange={handleSegmentSelected}>
        {data.map((agregado, idx) => (
          <option key={idx} value={`${agregado.id as string},${agregado.nome as string}`}>{agregado.nome}</option>
        ))}
        </Select>
        <Box display="flex" justifyContent="end">
          <Box py={4} width="30%">
            <Button onClick={setFlag.toggle}>Criar novo segmento</Button>
          </Box>
        </Box>
        {selectedAgregado && (
        <Box>
          <UpdateSegmentForm agregado={selectedAgregado} defaultValues={strategyHasAggData || null} estrategiaId={estrategia.id} onClose={onClose}/>
        </Box>
        )}
        </>)}
      </Box>
    )
  }
}
export default ManageSegments
