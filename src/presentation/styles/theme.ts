import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Raleway, sans-serif',
  },

  colors: {
    primary: {
      100: '#d3dce4',
      200: '#a7baca',
      300: '#7c97af',
      400: '#507595',
      500: '#24527a',
      600: '#1d4262',
      700: '#163149',
    },
    secondary: {
      100: '#E3DFE8',
      200: '#CEC2CE',
      300: '#af7c97',
      400: '#955075',
      500: '#7a2452',
      600: '#621d42',
      700: '#491631',
    },
    secondaryDark: {
      default: '#55193A',
    },
    secondaryLight: {
      default: '#CEC2CE',
    },
    secondaryLightest: {
      default: '#E3DFE8',
    },
    tertiary: {
      default: '#7a6f24',
    },
    textDark: {
      500: '#374155',
    },
    textNormal: {
      default: '#B0BAC9',
    },
    bgColor: {
      500: '#f4f6fc',
    },
  },
  semanticTokens: {},
})

export default theme
