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
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import NavItem from './NavItem'
import logo from '../../assets/logo_transparent_vector.svg'
import Header from '../header/header'

interface LinkItemProps {
  name: string
  icon: IconType
  path: string
}
const LinkItems: LinkItemProps[] = [
  { name: 'Home', icon: FiHome, path: '#' },
  { name: 'Trending', icon: FiTrendingUp, path: '#' },
  { name: 'Explore', icon: FiCompass, path: '#' },
  { name: 'Favourites', icon: FiStar, path: '#' },
  { name: 'Settings', icon: FiSettings, path: '#' },
]

export default function SidebarWithHeader (): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Flex height="100vh">
        <SidebarContent
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
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Box flex="1">
          <Header onOpen={onOpen} />
        </Box>
      </Flex>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps): JSX.Element => {
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
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
