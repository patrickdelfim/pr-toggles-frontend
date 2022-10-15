import React, { useContext } from 'react'
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react'
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import { Outlet } from 'react-router-dom'
import logo from '../../assets/logo-no-text.svg'
import { ApiContext } from '@/presentation/context'

type props = {
  onOpen?: () => void
}

const Header: React.FC<props> = ({ onOpen }: props) => {
  const { getCurrentAccount } = useContext(ApiContext)
  const withSidebar = !!onOpen

  const userData = getCurrentAccount()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Flex
        ml={{ base: 0, md: 0 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
      >
        {withSidebar && (
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />
        )}
        <Box display="flex" flex="1" alignItems="center">
          <Box
            alignItems="center"
            display={{ base: 'flex', md: withSidebar ? 'none' : 'block' }}
            position={{ md: withSidebar ? 'static' : 'fixed' }}
            left="50%"
            flex="1"
            justifyContent="center"
          >
            <Image ml="4" boxSize="70px" src={logo} alt="PR Toggles logo" />
          </Box>
        </Box>

        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <Avatar
                    size={'sm'}
                    name={userData.name}
                    src={
                      'userData?.userAvatar'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm" data-testid="username">{userData.name}</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <Outlet />
    </Box>
  )
}

export default Header
