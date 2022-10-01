import { ComponentStyleConfig } from '@chakra-ui/react'

export const TextareaTheme: ComponentStyleConfig = {
  // The styles all Inputs have in common
  baseStyle: {},
  variants: {
    primary: {

      bg: 'secondary.100',
      border: '1px',
      borderColor: 'secondary.400',
      _focus: { bg: 'secondary.100' },
      _hover: { bg: 'secondary.100' },

    },
  },
  defaultProps: {
    variant: 'primary',
  },
}
