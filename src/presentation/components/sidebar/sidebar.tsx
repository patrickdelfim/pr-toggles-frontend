import React from 'react'
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Image,
  Text,
  Link,
  Divider,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import {
  FiCompass,
  FiSettings,
  FiUsers,
  FiFlag,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import NavItem from './NavItem'
import logo from '../../assets/logo_transparent_vector.svg'
import Header from '../header/header'
import { Link as RouterDomLink, useParams, useLocation, useNavigate } from 'react-router-dom'
import { LoadProjects } from '@/domain/usecases/load-projects'
import useGetProject from '@/presentation/hooks/useGetProject'
import { useErrorHandler } from '@/presentation/hooks/use-error-handler'
import { ProjectContext } from '@/presentation/context'

interface LinkItemProps {
  name: string
  icon: IconType
  path: string
}
const LinkItems: LinkItemProps[] = [
  { name: 'Funcionalidades', icon: FiFlag, path: '' },
  { name: 'Segmentos', icon: FiUsers, path: '#' },
  { name: 'Auditoria e Logs', icon: FiCompass, path: '#' },
  { name: 'Configuração', icon: FiSettings, path: 'config' },
]

export default function SidebarWithHeader (): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const onError = useErrorHandler((error) => {
    toast({
      id: 'getProjectById',
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
    navigate('/panel')
  })

  const state = location.state as {project: LoadProjects.Model}
  const { data: project } = useGetProject(params.id, state?.project, onError)

  return (
    <ProjectContext.Provider value={project}>
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <Flex height="100vh">
            <SidebarContent
            projectName={project?.nome}
            onClose={() => onClose}
            display={{ base: 'none', md: 'block' }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} projectName={project?.nome}/>
            </DrawerContent>
          </Drawer>
          <Box flex="1">
            <Header onOpen={onOpen} />
          </Box>
        </Flex>
      </Box>
    </ProjectContext.Provider>
  )
}

interface SidebarProps extends BoxProps {
  projectName: string
  onClose: () => void
}

const SidebarContent = ({ onClose, projectName, ...rest }: SidebarProps): JSX.Element => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      h="full"
      {...rest}
    >
      <Flex
        h="40"
        alignItems="center"
        mx="8"
        justifyContent={{ base: 'space-between', md: 'center' }}
      >
        <Box alignItems="center" justifyContent="center">
          <Image boxSize="120px" src={logo} alt="PR Toggles logo" />
        </Box>

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box justifyContent="center" textAlign="center" pt="4">
        {projectName
          ? (
          <Text pb="4">{projectName}</Text>
            )
          : (
          <Box pb="4">
            <Spinner />
          </Box>
            )}

        <Link
          as={RouterDomLink}
          to={'/panel'}
          variant="primary"
          style={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 'none' }}
        >
          Alterar projeto
        </Link>
      </Box>
      <Box py="4">
        <Divider borderColor="black" />
      </Box>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
