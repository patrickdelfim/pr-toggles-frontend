import { Box, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const SkeletonCardList: React.FC = () => {
  return (
    <Box data-testid="skeletonCardList">
      {[...Array(5)].map((_, idx) => (
        <Box
          key={idx}
          bg="white"
          minW={'full'}
          minH="60px"
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Stack p="4">
            <Skeleton height="10px" />
            <Skeleton height="10px" />
          </Stack>
        </Box>
      ))}
    </Box>
  )
}

export default SkeletonCardList
