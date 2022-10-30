import { FeatureModel } from '@/domain/models/feature-model'
import useUpdateFeature from '@/presentation/hooks/useUpdateFeature'
import { Box, Switch, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

type props = {
  feature: FeatureModel
  selectedEnv: string
  onOpen: () => void
}
const FeatureCardList: React.FC<props> = ({ feature, selectedEnv, onOpen }: props) => {
  const toast = useToast()
  const [fetching, setfetching] = useState(false)
  const onSuccess = async (): Promise<void> => {
    toast({
      title: 'salvo!',
      status: 'success',
      isClosable: true,
    })
    setfetching(false)
  }

  const onError = async (error: Error): Promise<void> => {
    toast({
      id: 'updateFeatureError',
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
    setfetching(false)
  }
  const updateFeatureMutation = useUpdateFeature(onSuccess, onError)

  const updateFeature = (): void => {
    if (!fetching) {
      updateFeatureMutation.mutate({ id: feature.id, [selectedEnv]: !feature[selectedEnv] })
    }
    setfetching(true)
  }

  return (
    <Box
      cursor={fetching ? 'wait' : 'pointer'}
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
          onOpen()
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
        <Switch colorScheme="facebook" isChecked={feature[selectedEnv]} onChange={updateFeature}/>
      </Box>
    </Box>
  )
}

export default FeatureCardList
