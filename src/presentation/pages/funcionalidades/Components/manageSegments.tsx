import React, { useState } from 'react'
import { Box, Button, Select, useBoolean } from '@chakra-ui/react'
import AgregadoManagement from './agregadoManagement/agregadoManagement'

const segmentList = ['grupo_zap', 'pessoas_idosas', 'grupo_testes_A', 'grupo_testes_B']

const ManageSegments: React.FC = () => {
  const [flag, setFlag] = useBoolean()
  const [selectedSegment, setSegment] = useState(null)
  const handleSegmentSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSegment(e.target.value)
  }
  if (flag) {
    return (
      <Box>
        <AgregadoManagement />
      </Box>
    )
  } else {
    return (
      <Box onClick={() => console.log(selectedSegment)}>Manage segment value
        <Select placeholder='Selecione o Segmento' onChange={handleSegmentSelected}>
        {segmentList.map((segmento, idx) => (
          <option key={idx} value={segmento}>{segmento}</option>
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
      </Box>
    )
  }
}
export default ManageSegments
