import { Box, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import AddCardIcon from '@mui/icons-material/AddCard'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Divider from '@mui/material/Divider'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useEffect, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Listcards from './Listcards/Listcards'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { mapOrder } from '~/utils/Sort'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

const COLUMN_WIDTH = '300px'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function Column({ column, createNewCard, deleteColumnDetails }) {
  // Xử lí đóng mở button add new card
  const [openNewCard, setOpenNewCard] = useState(false)
  const toggleOpenNewCardForm = () => {
    setOpenNewCard(!openNewCard)
    setNewTitle('')
  }

  const [newTitle, setNewTitle] = useState('')

  const addNewCard = async () => {
    if (!newTitle) {
      toast.error('Please enter card name!', { position: 'top-right' })
      return
    } // Nếu ko nhập gì thì ko làm

    const newCardData = {
      title: newTitle,
      columnId: column._id
    }

    // gọi API tạo card
    await createNewCard(newCardData)
    setNewTitle('')
    toggleOpenNewCardForm()
  }

  const cardSorted = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })

  const dndStyleColumn = {
    // giải quyết vấn đè tranform strecht
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])


  // xử lý xóa column
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'delete column ?',
      description: 'This action permanently delete your column and its card. Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'

    }).then(() => {
      deleteColumnDetails(column._id)
    }).catch(() => {})
  }
  return (
    <div ref={setNodeRef} style={dndStyleColumn} {...attributes}>
      <Box
        {...listeners}
        sx={{
          maxWidth: COLUMN_WIDTH,
          minWidth: COLUMN_WIDTH,
          ml: 2,
          borderRadius: '8px',
          bgcolor: ( theme ) => (theme.palette.mode === 'light' ? '#ebecf0' : '#333643'),
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
          height: 'fit-content'
        }}>
        {/* box header */}
        <Box sx={{
          height: COLUMN_HEADER_HEIGHT,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}>
          <Typography variant='h5' sx={{
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {column?.title}
          </Typography>

          <>
            <KeyboardArrowDownIcon
              ref={anchorRef}
              id="composition-button-Workspaces"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{
                cursor: 'pointer'
              }}/>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom'
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu-Workspaces"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                        onClick={handleClose}
                      >
                        <MenuItem onClick={toggleOpenNewCardForm} sx={{
                          '&:hover': {
                            color: 'success.light',
                            '& .add-Icon': { color: 'success.light' }
                          }
                        }}>
                          <ListItemIcon>
                            <AddCardIcon className='add-Icon' fontSize="small" />
                          </ListItemIcon>
                          <ListItemText >Add new card</ListItemText>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <ContentCut fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Cut</ListItemText>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <ContentCopy fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Copy</ListItemText>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <ContentPaste fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Paste</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleDeleteColumn} sx={{
                          '&:hover': {
                            color: 'warning.dark',
                            '& .delete-Icon': { color: 'warning.dark' }
                          }
                        }}>
                          <ListItemIcon>
                            <DeleteIcon className='delete-Icon' fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Delete this column</ListItemText>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <Cloud fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Archive this column</ListItemText>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        </Box>

        {/* box card list*/}
        <Listcards cards={cardSorted}/>
        {/* box footer */}
        <Box sx={{
          height: COLUMN_FOOTER_HEIGHT,
          p: 2
        }}>
          {!openNewCard ?
            <Box onClick={toggleOpenNewCardForm} sx={{ height: '100%', display:'flex', justifyContent: 'space-between', alignItems:'center' }}>
              <Button startIcon={ <AddCardIcon/> }>
                  Add new Card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
            :
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                id="outlined-basic-search"
                label="Enter new card"
                data-no-dnd="true"
                variant="outlined"
                autoFocus
                size='small'
                sx={{
                  '& label': { color: 'text.primary'},
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main},
                    '&:hover fieldset':  { borderColor: (theme) => theme.palette.primary.main},
                    '& .Mui-focused fieldset':  { borderColor: (theme) => theme.palette.primary.main},
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Button onClick={addNewCard} variant='contained' size='small' color='success'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >
                  Add
                </Button>
                <CloseIcon fontSize='small' onClick={toggleOpenNewCardForm} sx={{
                  color: (theme) => theme.palette.warning.light,
                  cursor: 'pointer'
                }}/>
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column
