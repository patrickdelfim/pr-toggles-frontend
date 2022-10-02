import ApiError from '@/presentation/components/apiError/apiError'
import useListProject from '@/presentation/hooks/uselistProject'
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
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import CardList from './Components/cardList'
import CreateProjectModal from './Components/createProjectModal'
import SkeletonCardList from './Components/skeletonCardList'

const Projects: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, status, error } = useListProject()
  const [search, setSearch] = useState('')
  const onCloseModal = (): void => {
    setSearch('')
    onClose()
  }

  useEffect(() => {

  }, [search])
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
            <Button variant="primary" height="50px" onClick={onOpen} disabled={ status === 'loading' || status === 'error' }>
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
                disabled={status === 'loading' || status === 'error' || data.length === 0}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p="10"
            >
              <Text fontSize="xl">
                Parece que voce ainda não tem nenhum projeto.
              </Text>
              <Text pt="4" fontSize="xl">
                Clique em
                <Text
                  as="span"
                  color="primary.500"
                  fontWeight="bold"
                  _hover={{ cursor: 'pointer', color: 'primary.300' }}
                  onClick={onOpen}
                >
                  {' '}Criar novo projeto{' '}
                </Text>
                para utilizar todo o potencial de PR toggles!
              </Text>
            </Box>
          </Box>
        )}
        {data?.length > 0 &&
          search.length > 0 &&
          data.filter((s) => s.nome.includes(search)).length > 0 &&
          data
            .filter((s) => s.nome.includes(search))
            .map((project) => (
              <CardList
                key={project.projeto_id}
                title={project.nome}
                subtitle={`Created ${project.created_at as string} - 
            ${(project.descricao as string) || 'Sem descrição'}`}
              />
            ))}
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
              <Text fontSize="xl" textAlign="center" pt="4">Resultado não encontrado.</Text>
            </Box>
        )}

        {data?.length > 0 &&
          search.length === 0 &&
          data.map((project) => (
            <CardList
              key={project.projeto_id}
              title={project.nome}
              subtitle={`Created ${project.created_at as string} - 
            ${(project.descricao as string) || 'Sem descrição'}`}
            />
          ))}
      </Container>
      <CreateProjectModal isOpen={isOpen} onClose={onCloseModal} />
    </>
  )
}

export default Projects
