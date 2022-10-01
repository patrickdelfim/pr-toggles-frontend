import {
  Box,
  Button,
  Text,
  Container,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { FiChevronRight, FiSearch } from 'react-icons/fi'
import CreateProjectModal from './Components/createProjectModal'

const Projects: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
          <Button variant="primary" height="50px" onClick={onOpen}>
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
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<FiSearch color="gray.300" />}
            />
            <Input type="tel" placeholder="Search" borderRadius="lg" />
          </InputGroup>
        </Box>
      </Box>

      <Box
        cursor="pointer"
        display="flex"
        alignItems="end"
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
        <Box display="flex" flexDirection="column" justifyContent="end">
          <Box display="flex" alignItems="center" pb="1">
            <Text
              pl="4"
              color="primary.500"
              fontWeight="bold"
              letterSpacing={1.1}
            >
              Backend Amazon
            </Text>
          </Box>
          <Text pl="4" color="gray.600" fontSize="10">
            Created 20th Jul 2022 23:27pm - Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type a
          </Text>
        </Box>
        <Icon alignSelf="center" mr="2" fontSize="32" as={FiChevronRight} />
      </Box>
      <Box
        cursor="pointer"
        display="flex"
        alignItems="end"
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
        <Box display="flex" flexDirection="column" justifyContent="end">
          <Box display="flex" alignItems="center" pb="1">
            <Text
              pl="4"
              color="primary.500"
              fontWeight="bold"
              letterSpacing={1.1}
            >
              Backend Amazon
            </Text>
          </Box>
          <Text pl="4" color="gray.600" fontSize="10">
            Created 20th Jul 2022 23:27pm - Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type a
          </Text>
        </Box>
        <Icon alignSelf="center" mr="2" fontSize="32" as={FiChevronRight} />
      </Box>
    </Container>
        <CreateProjectModal isOpen={isOpen} onClose={onClose} />
              </>

  )
}

export default Projects
