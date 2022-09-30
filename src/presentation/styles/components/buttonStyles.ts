import { ComponentStyleConfig } from '@chakra-ui/react'

export const ButtonTheme: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: {
      color: 'white',
      bg: 'primary.500',
      w: '100%',
      _focus: { border: 'none' },
      _hover: { bg: 'primary.400' },
      _active: { bg: 'primary.300' },
    },
    secondary: {
      color: 'white',
      bg: 'secondary.500',
      w: '100%',
      _focus: { border: 'none' },
      _hover: { bg: 'secondary.400' },
      _active: { bg: 'secondary.300' },
    },
  },
  defaultProps: {
    variant: 'secondary',
  },
}
