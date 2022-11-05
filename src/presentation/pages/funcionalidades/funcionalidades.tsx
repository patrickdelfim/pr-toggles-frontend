import ApiError from '@/presentation/components/apiError/apiError'
import { useErrorHandler } from '@/presentation/hooks/use-error-handler'
import {
  Box,
  Button,
  Text,
  Container,
  InputGroup,
  InputLeftElement,
  Input,
  Heading,
  useDisclosure,
  TabList,
  Tabs,
  Tab,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import FeatureCardList from './Components/featurecardList'
import SkeletonCardList from '@/presentation/components/skeletonCardList/skeletonCardList'
import useListFeatures from '@/presentation/hooks/useListFeatures'
import { useParams } from 'react-router-dom'
import CreateFeatureDrawer from './Components/createFeatureDrawer'
import ManageFeatureDetails from './Components/manageFeatureDetails/manageFeatureDetails'

const Funcionalidades: React.FC = () => {
  const envs = ['dev', 'homolog', 'prod']
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const openEditFeature = (featureId: string): void => {
    setSelectedFeatureId(featureId)
    onOpenEdit()
  }
  const [selectedEnv, setSelectedEnv] = useState(envs[0])
  const [selectedFeatureId, setSelectedFeatureId] = useState(null)
  const params = useParams()
  const onError = useErrorHandler()
  const { data, status, error } = useListFeatures(params.id, onError)
  const [search, setSearch] = useState('')

  return (
    <>
      <Heading size="md" p="2">
        Ambiente:
      </Heading>
      <Tabs onChange={(index) => setSelectedEnv(envs[index])}>
        <TabList>
          <Tab>Desenvolvimento</Tab>
          <Tab>Homologação</Tab>
          <Tab>Produção</Tab>
        </TabList>
      </Tabs>
      <Container maxW="4xl" mt={20}>
        <Box
          pb="2"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box pl="4" maxW="70%">
            <Heading size="md">Funcionalidades {selectedEnv}</Heading>
            <Text pt="0.5" fontSize="sm">
              Gerencie funcionalidades do seu projeto com um click e de forma
              remota.
            </Text>
          </Box>
          <Box>
            <Button
              variant="primary"
              fontSize="sm"
              onClick={onOpenCreate}
              disabled={status === 'loading' || status === 'error'}
              data-testid="openNewProjectModal"
            >
              Criar funcionalidade
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="secondary.500"
          minW={'full'}
          height="40px"
          borderRadius="lg"
          borderBottomRadius="0"
        >
          <Text
            px="4"
            color="white"
            fontWeight="bold"
            size="sm"
            letterSpacing={1.1}
          >
            Funcionalidades
          </Text>
          <Box minW="33" pr="4">
            <InputGroup size="sm">
              <InputLeftElement height="100%" pointerEvents="none">
                <FiSearch color="#4A5568" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search"
                borderRadius="lg"
                width="150px"
                height="20px"
                disabled={
                  status === 'loading' ||
                  status === 'error' ||
                  data.length === 0
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="searchInput"
              />
            </InputGroup>
          </Box>
        </Box>

        {status === 'error' && (
          <Box>
            {console.log(error)}
            <Box
              bg="white"
              minW={'full'}
              minH="60px"
              borderBottom="1px"
              borderColor="gray.200"
            >
              <ApiError error={error} />
            </Box>
          </Box>
        )}
        {status === 'loading' && <SkeletonCardList />}
        {data?.length === 0 && (
          <Box
            bg="white"
            minW={'full'}
            minH="60px"
            borderBottom="1px"
            borderColor="gray.200"
            data-testid="noProjectContainer"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p="10"
            >
              <Text fontSize="xl" data-testid="title">
                Parece que voce ainda não tem nenhum funcionalidade cadastrada.
              </Text>
              <Text pt="4" fontSize="xl" data-testid="subtitle">
                Clique em
                <Text
                  as="span"
                  color="primary.500"
                  fontWeight="bold"
                  _hover={{ cursor: 'pointer', color: 'primary.300' }}
                  onClick={onOpenCreate}
                >
                  {' '}
                  Criar nova funcionalidade{' '}
                </Text>
                para utilizar todo o potencial de PR toggles!
              </Text>
            </Box>
          </Box>
        )}

        {data?.length > 0 &&
          search.length > 0 &&
          data.filter((s) => s.nome.includes(search)).length === 0 && (
            <Box
              bg="white"
              minW={'full'}
              minH="60px"
              borderBottom="1px"
              borderColor="gray.200"
            >
              <Text
                fontSize="xl"
                textAlign="center"
                pt="4"
                data-testid="projectNotFoundSearchText"
              >
                Resultado não encontrado.
              </Text>
            </Box>
        )}
        {data?.length > 0 && (
          <Box data-testid="projectsContainer">
            {search.length > 0
              ? data.filter((s) => s.nome.includes(search)).length > 0 &&
                data
                  .filter((s) => s.nome.includes(search))
                  .map((feature) => (
                    <FeatureCardList
                      key={feature.id}
                      selectedEnv={`ativada_${selectedEnv}`}
                      feature={feature}
                      onOpen={() => openEditFeature(feature.id)}
                    />
                  ))
              : search.length === 0 &&
                data.map((feature) => (
                  <FeatureCardList
                    key={feature.id}
                    selectedEnv={`ativada_${selectedEnv}`}
                    feature={feature}
                    onOpen={() => openEditFeature(feature.id)}
                  />
                ))}
          </Box>
        )}
      </Container>
      <CreateFeatureDrawer isOpen={isOpenCreate} onClose={onCloseCreate} />
      {data && selectedFeatureId && (
        <ManageFeatureDetails isOpen={isOpenEdit} onClose={onCloseEdit} feature={data?.find(feature => feature.id === selectedFeatureId)} ambiente={selectedEnv}/>
      )}
    </>
  )
}

export default Funcionalidades
