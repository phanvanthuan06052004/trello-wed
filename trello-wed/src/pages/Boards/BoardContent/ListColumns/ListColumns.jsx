import { Box } from '@mui/material'
import Column from './Column/Column'
function ListColumns({ columns }) {


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
        {columns.map((data) => <Column key={data._id} column={data}/>)}
      </Box>
    </>
  )
}

export default ListColumns
