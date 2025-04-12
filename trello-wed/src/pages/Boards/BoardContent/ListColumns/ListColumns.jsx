import { Box, Button } from '@mui/material'
import Column from './Column/Column'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import PostAddIcon from '@mui/icons-material/PostAdd'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { createNewColumnAPI } from '~/Apis'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
function ListColumns({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  // Xử lí đóng mở button add new column
  const [openNewColumn, setOpenNewColumn] = useState(false)
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumn(!openNewColumn)
    setNewTitle('')
  }

  const [newTitle, setNewTitle] = useState('')

  const addNewColumn = async () => {
    if (!newTitle) {
      toast.error('Please enter column name!', { position: 'bottom-left' })
      return
    } // Nếu ko nhập gì thì ko làm

    const newColumn = {
      title: newTitle
    }
    // Gọi API tạo column
    const result = await createNewColumnAPI({
      ...newColumn,
      boardId: board._id
    })

    /**
     * Đoạn này sẽ dính lỗi object is not extensible bởi dù đã copy/clone ra giá trị newBoard nhưng bản chất
     * của spread operator là Shallow copy/Clone, nên dính phải rules Immutablility trong redux tookit không
     * dùng được hàm PUSH (sửa giá trị mảng trực tiếp), nên dùng Deep Copy cho lẹ
     * thường hay dùng nữa là Concat để ghép mảng
     */
    // refet lại data
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    newBoard.columnOrderIds.push(result._id)
    newBoard.columns.push(result)
    // tiến hành kiểm tra coi có placehokder nào không thì thêm
    if (isEmpty(newBoard.columns[newBoard.columns.length - 1].cards)) {
      newBoard.columns[newBoard.columns.length - 1].cards = [generatePlaceholderCard(newBoard.columns[newBoard.columns.length - 1])]
      newBoard.columns[newBoard.columns.length - 1].cardOrderIds = [generatePlaceholderCard(newBoard.columns[newBoard.columns.length - 1])._id]
    }
    dispatch(updateCurrentActiveBoard(newBoard))

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
