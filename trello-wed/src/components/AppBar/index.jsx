import { Box } from '@mui/material'
import ModeSelect from '../ModeSelect'

function Appbar() {
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.appBarHeight,
        backgroundColor: 'primary.main'
      }}>
        <ModeSelect />
      </Box>
    </>
  )
}

export default Appbar
