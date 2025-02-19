import { Box } from '@mui/material'
import Column from './Column/Column'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
function ListColumns({ columns }) {


  return (
    <>
      <SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
      </SortableContext>
    </>
  )
}

export default ListColumns
