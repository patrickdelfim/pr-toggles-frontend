import { ComponentStyleConfig } from '@chakra-ui/react'

export const SelectTheme: ComponentStyleConfig = {
  // The styles all Selects have in common
  baseStyle: {},
  variants: {
    primary: {
      field: {
        bg: 'secondary.100',
        border: '1px',
        borderColor: 'secondary.400',
        _focus: { bg: 'secondary.100' },
        _hover: { bg: 'secondary.100' },
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
}
