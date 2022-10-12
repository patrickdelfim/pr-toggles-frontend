import { LoadProjects } from '@/domain/usecases/load-projects'
import { Box, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type props = {
  project: LoadProjects.Model
}
const CardList: React.FC<props> = ({ project }: props) => {
  return (
    <Link to={`project/${project.projeto_id}`} state={{ project }}>
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
            data-testid="title"
            >
            {project.nome || ''}
          </Text>
        </Box>
        <Text pl="4" color="gray.600" fontSize="10" data-testid="subtitle"
>
        {`Created ${project.created_at} - ${(project.descricao) || 'Sem descrição'}`}
        </Text>
      </Box>
      <Icon alignSelf="center" mr="2" fontSize="32" as={FiChevronRight} />
    </Box>
  </Link>
  )
}

export default CardList
