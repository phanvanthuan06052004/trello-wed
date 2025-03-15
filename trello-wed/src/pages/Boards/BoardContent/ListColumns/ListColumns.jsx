import { Box, Button } from '@mui/material'
import Column from './Column/Column'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import PostAddIcon from '@mui/icons-material/PostAdd'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
function ListColumns({ columns }) {

  // Xử lí đóng mở button add new column
  const [openNewColumn, setOpenNewColumn] = useState(false)
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumn(!openNewColumn)
    setNewTitle('')
  }

  const [newTitle, setNewTitle] = useState('')

  const addNewColumn = () => {
    if (!newTitle) return // Nếu ko nhập gì thì ko làm

    setNewTitle('')
    toggleOpenNewColumnForm()
  }
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

          {/* add new card */}
          { !openNewColumn ?
            <Box onClick={toggleOpenNewColumnForm} sx={{
              minWidth: '230px',
              maxWidth: '230px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}>
              <Button startIcon={<PostAddIcon />} sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1}}>
              Add new column
              </Button>
            </Box>
            :
            <Box sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              bgcolor: '#ffffff3d',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              <TextField
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                id="outlined-basic-search"
                label="Enter column title"
                variant="outlined"
                autoFocus
                size='small'
                sx={{
                  minWidth: 120,
                  maxWidth: 230,
                  'label': { color: 'white' },
                  'label.Mui-focused': { color: 'white' },
                  'input': { color: 'white' },
                  'border': { color: 'white' },
                  '.MuiOutlinedInput-root':{
                    '& fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' }
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Button onClick={addNewColumn} variant='contained' size='small' color='success'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >
                  Add column
                </Button>
                <CloseIcon onClick={toggleOpenNewColumnForm} sx={{
                  color: 'white',
                  '&:hover': { color: (theme) => theme.palette.warning.light},
                  cursor: 'pointer'
                }}/>
              </Box>
            </Box>
          }
        </Box>
      </SortableContext>
    </>
  )
}

export default ListColumns
