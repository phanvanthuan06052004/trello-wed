import { useColorScheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import LightModeIcon from '@mui/icons-material/LightMode'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ThemeMode() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const modeSelected = event.target.value
    setMode(modeSelected)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-mode-label">Mode</InputLabel>
      <Select
        labelId="select-mode-label"
        id="select-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon />
            Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Brightness4Icon />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.appBarHeight,
        backgroundColor: 'primary.main'
      }}>
        <ThemeMode />
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.boardBarHeight,
        backgroundColor: 'primary.dark'
      }}>
       Board Bar
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        backgroundColor: 'primary.50'
      }}>
        Content
      </Box>
    </Container>
  )
}

export default App
