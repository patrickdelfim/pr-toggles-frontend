import { ComponentStyleConfig } from '@chakra-ui/react'

export const LinkTheme: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    secondary: {
      color: 'secondary.500',
      fontWeight: '700',
      _focus: { border: 'none' },
      _hover: { color: 'secondary.400' },
      _active: { color: 'secondary.300' },
    },
    primary: {
      color: 'primary.500',
      fontWeight: '700',
      _focus: { border: 'none' },
      _hover: { color: 'primary.400' },
      _active: { color: 'primary.300' },
    },
  },
  defaultProps: {
    variant: 'secondary',
  },
}
