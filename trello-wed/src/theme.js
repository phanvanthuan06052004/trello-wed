import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#000'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#2196f3'
        }
      }
    }
  }
// ...other properties
})

export default theme