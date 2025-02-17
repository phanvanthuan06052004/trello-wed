import { Box } from '@mui/material'
import Column from './Column/Column'
function ListColumns() {


  return (
    <>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        bgcolor: 'inherit',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': {
          m: 1
        }
      }}>
        {/* box column  */}
        <Column />
      </Box>
    </>
  )
}

export default ListColumns
