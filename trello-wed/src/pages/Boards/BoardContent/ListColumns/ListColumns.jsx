import { Box, Button, Typography } from '@mui/material'
import Column from './Column/Column'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import PostAddIcon from '@mui/icons-material/PostAdd';
const COLUMN_WIDTH = '200px'
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
          <Typography
            sx={{
              maxWidth: COLUMN_WIDTH,
              minWidth: COLUMN_WIDTH,
              ml: 2,
              borderRadius: '8px',
              bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(211, 211, 211, 0.5)' : '#333643'),
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
              height: 'fit-content',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5px'
            }}
          >
            <Button startIcon={<PostAddIcon />} sx={{ justifyContent: 'center', alignItems: 'center', gap: 1, color: 'white', bgcolor: '' }}>
              Add new Column
            </Button>
          </Typography>
        </Box>
      </SortableContext>
    </>
  )
}

export default ListColumns
