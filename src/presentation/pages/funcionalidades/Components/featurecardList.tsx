import { FeatureModel } from '@/domain/models/feature-model'
import { Box, Switch, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type props = {
  feature: FeatureModel
  selectedEnv: boolean
}
const FeatureCardList: React.FC<props> = ({ feature, selectedEnv }: props) => {
  const [checked, setChecked] = useState(false)
  console.log(selectedEnv)
  useEffect(() => {
    setChecked(selectedEnv)
  }, [selectedEnv])
  return (
    <Box
      cursor="pointer"
      display="flex"
      justifyContent="space-between"
      bg="white"
      minW={'full'}
      minH="60px"
      borderBottom="1px"
      borderColor="gray.200"
      _hover={{
        boxShadow: 'md',
        color: 'primary.500',
        borderBottom: '2px',
        borderColor: 'gray.300',
      }}
    >
      <Box
        display="flex"
        flexGrow={1}
        onClick={() => {
          console.log('click')
        }}
      >
        <Box display="flex" flexDirection="column" justifyContent="end">
          <Box display="flex" alignItems="center" pb="1">
            <Text
              pl="4"
              color="primary.500"
              fontWeight="bold"
              letterSpacing={1.1}
              data-testid="title"
            >
              {feature.nome || ''}
            </Text>
          </Box>
          <Text pl="4" color="gray.600" fontSize="10" data-testid="subtitle">
            {`Created ${feature.created_at} - ${
              feature.descricao || 'Sem descrição'
            }`}
          </Text>
        </Box>
      </Box>
      <Box display="flex" alignSelf="center" pr={4}>
        <Switch colorScheme="facebook" isChecked={checked} onChange={() => { setChecked(!checked) }}/>
      </Box>
    </Box>
  )
}

export default FeatureCardList
