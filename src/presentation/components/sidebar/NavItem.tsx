import { Flex, Icon, Link } from '@chakra-ui/react'
import React, { ReactText } from 'react'
import { IconType } from 'react-icons'
import { Link as RouterDomLink } from 'react-router-dom'
interface NavItemProps {
  icon: IconType
  children: ReactText
  path: string
}
const NavItem = ({ path, icon, children }: NavItemProps): JSX.Element => {
  return (
    <Link
      as={RouterDomLink}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'secondary.500',
          color: 'white',
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default NavItem
