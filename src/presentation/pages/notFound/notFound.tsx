import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import Img404 from '../../assets/404.svg'

const NotFound: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" width={'100vw'} height={'100vh'}>
      <Image ml="4" width='100%' height='100%'src={Img404} alt="Page not found" />
      </Box>
  )
}

export default NotFound
