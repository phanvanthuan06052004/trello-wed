import { useColorScheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

import LightModeIcon from '@mui/icons-material/LightMode'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const modeSelected = event.target.value
    setMode(modeSelected)
  }
  return (
    <FormControl
      sx={{
        minWidth: 120
      }}
      size="small"
    >
      <InputLabel
        id="select-mode-label"
        sx={{
          color: 'white',
          '&.Mui-focused': { color: 'white' } }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="select-mode-label"
        id="select-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiSvgIcon-root': { color: 'white' },
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
        }}
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

export default ModeSelect
