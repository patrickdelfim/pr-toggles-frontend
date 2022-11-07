import { extendTheme } from '@chakra-ui/react'
import { InputTheme as Input } from './components/inputStyles'
import { TextareaTheme as Textarea } from './components/textAreaStyles'
import { ButtonTheme as Button } from './components/buttonStyles'
import { LinkTheme as Link } from './components/linkStyles'
import { SelectTheme as Select } from './components/selectStyles'
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
    tertiary: '#7a6f24',

    textDark: {
      500: '#374155',
    },
  },
  components: {
    Button,
    Input,
    Link,
    Textarea,
    Select
  },
})

export default theme
