import ApiError from '@/presentation/components/apiError/apiError'
import { useErrorHandler } from '@/presentation/hooks/use-error-handler'
import useListProjects from '@/presentation/hooks/useListProjects'
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
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import ProjectCardList from './Components/projectcardList'
import CreateProjectModal from './Components/createProjectModal'
import SkeletonCardList from '@/presentation/components/skeletonCardList/skeletonCardList'
import useGetUserData from '@/presentation/hooks/useGetUserData'

const Projects: React.FC = () => {
  const onError = useErrorHandler()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useGetUserData()
  const { data, status, error } = useListProjects(onError, user.cliente_id)
  const [search, setSearch] = useState('')
  const onCloseModal = (): void => {
    setSearch('')
    onClose()
  }

  return (
    <>
      <Container maxW="7xl" mt={20}>
        <Box
          pb="2"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box pl="4" maxW="70%">
            <Heading>Seus projetos</Heading>
            <Text pt="0.5">
              Crie e gerencie funcionalidades de seus projetos de software
              segmentando por ambiente e de forma remota.
            </Text>
          </Box>
          <Box>
            <Button
              variant="primary"
              height="50px"
              onClick={onOpen}
              disabled={status === 'loading' || status === 'error'}
              data-testid="openNewProjectModal"
            >
              Criar novo projeto
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="secondary.500"
          minW={'full'}
          height="55px"
          borderRadius="lg"
          borderBottomRadius="0"
        >
          <Text
            px="4"
            color="white"
            fontWeight="bold"
            fontSize="20"
            letterSpacing={1.1}
          >
            Projetos
          </Text>
          <Box minW="33" pr="4">
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search"
                borderRadius="lg"
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
                Parece que voce ainda não tem nenhum projeto.
              </Text>
              <Text pt="4" fontSize="xl" data-testid="subtitle">
                Clique em
                <Text
                  as="span"
                  color="primary.500"
                  fontWeight="bold"
                  _hover={{ cursor: 'pointer', color: 'primary.300' }}
                  onClick={onOpen}
                >
                  {' '}
                  Criar novo projeto{' '}
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
              <Text fontSize="xl" textAlign="center" pt="4" data-testid="projectNotFoundSearchText">
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
                  .map((project) => (
                    <ProjectCardList
                      key={project.projeto_id}
                      project={project}
                    />
                  ))
              : search.length === 0 &&
                data.map((project) => (
                  <ProjectCardList
                    key={project.projeto_id}
                    project={project}
                  />
                ))}
          </Box>
        )}
      </Container>
      <CreateProjectModal isOpen={isOpen} onClose={onCloseModal} />
    </>
  )
}

export default Projects
