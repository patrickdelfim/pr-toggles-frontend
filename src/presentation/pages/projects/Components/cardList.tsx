import { Box, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

type props = {
  title: string
  subtitle: string
}
const CardList: React.FC<props> = ({ title, subtitle }: props) => {
  return (
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
            {title}
          </Text>
        </Box>
        <Text pl="4" color="gray.600" fontSize="10">
          {subtitle}
        </Text>
      </Box>
      <Icon alignSelf="center" mr="2" fontSize="32" as={FiChevronRight} />
    </Box>
  )
}

export default CardList
