import { Input } from '@chakra-ui/react'
import React from 'react'

type props = {
  type: string
  placeholder?: string
}
const InputField: React.FC<props> = ({ type, placeholder }: props) => {
  return (
    <Input
      variant="filled"
      bg="secondary.100"
      border="1px"
      borderColor="secondary.400"
      _focus={{ bg: 'secondary.100' }}
      _hover={{ bg: 'secondary.100' }}
      type={type}
      placeholder={placeholder}
    />
  )
}
export default InputField
