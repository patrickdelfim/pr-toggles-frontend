import React, { useState } from 'react'
import { Box, Button, Select, Spinner, Text, useBoolean, useToast } from '@chakra-ui/react'
import AgregadoManagement from './agregadoManagement/agregadoManagement'
import useListAgregados from '@/presentation/hooks/useListAgregados'
import { useParams } from 'react-router-dom'

const ManageSegments: React.FC = () => {
  const [flag, setFlag] = useBoolean()
  const [selectedSegment, setSegment] = useState('')
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
  const handleSegmentSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSegment(e.target.value)
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
          {status === 'loading'
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
            <Select placeholder='Selecione o Segmento' value={selectedSegment} onChange={handleSegmentSelected}>
        {data.map((segmento, idx) => (
          <option key={idx} value={segmento.id}>{segmento.nome}</option>
        ))}
        </Select>
        <Box display="flex" justifyContent="end">
          <Box py={4} width="30%">
            <Button onClick={setFlag.toggle}>Criar novo segmento</Button>
          </Box>
        </Box>
        {selectedSegment && (
        <Box>
        {selectedSegment}
        </Box>
        )}
        </>)}
      </Box>
    )
  }
}
export default ManageSegments
