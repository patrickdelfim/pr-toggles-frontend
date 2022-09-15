import { Box, Container, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import logo from '../../../assets/logo_transparent_vector.svg'

const AccessLayoutHeader: React.FC = () => {
  return (
    <Container>
      <Box display="flex" alignItems="center" flexDirection="column" mt={1}>
        <Image boxSize="200px" src={logo} alt="PR Toggles logo" />
        <Heading fontSize="2xl" fontWeight="700" textAlign="center">
          Experimente nossa versão gratuita..
        </Heading>
        <Text fontSize="md" fontWeight="light" mt={3} textAlign="center">
          Comece a configurar o seu projeto agora mesmo!
        </Text>
      </Box>
    </Container>
  )
}

export default AccessLayoutHeader
