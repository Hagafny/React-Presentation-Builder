import { createTheme } from '@mui/material/styles'
import base from './base'
const { TEXT, BACKGROUND, PRIMARY } = base

const muiTheme = createTheme({
  colors: {
    text: TEXT,
    primary: PRIMARY,
  },
  palette: {
    type: 'light',
    primary: {
      main: TEXT,
    },
    secondary: {
      main: PRIMARY,
    },
    background: {
      default: BACKGROUND,
    },
    text: {
      primary: TEXT,
    },
  },
})

export default muiTheme
