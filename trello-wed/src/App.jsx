
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'


function ThemeMode() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    // setAge(event.target.value)
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
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
        <MenuItem value="system">System</MenuItem>
      </Select>
    </FormControl>
  )
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {

  return (
    <>
      <ThemeMode />
      <hr />
      <ModeToggle />
      <Button variant="contained">Hello world</Button>
    </>
  )
}

export default App
