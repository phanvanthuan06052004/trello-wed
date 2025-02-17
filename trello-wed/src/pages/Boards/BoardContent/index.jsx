import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
function BoardContent() {
 
  return (
    <>
      {/* box content */}
      <Box sx={{
        display: 'flex',
        height: (theme) => (theme.trello.boardContentHeight),
        backgroundColor: ( theme ) => (theme.palette.mode === 'light' ? '#1976d2' : '#34495e'),
        borderTop: '1px solid white',
        p: '10px 0'
      }}>
        <ListColumns />
      </Box>
    </>
  )
}

export default BoardContent
