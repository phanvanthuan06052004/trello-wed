import { Box } from '@mui/material'
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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import GroupsIcon from '@mui/icons-material/Groups'

const COLUMN_WIDTH = '300px'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
function BoardContent() {
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
          <Box sx={{
            maxWidth: COLUMN_WIDTH,
            minWidth: COLUMN_WIDTH,
            ml: 2,
            borderRadius: '8px',
            bgcolor: ( theme ) => (theme.palette.mode === 'light' ? '#ebecf0' : '#333643'),
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
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
                Column Title
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
                          >
                            <MenuItem>
                              <ListItemIcon>
                                <AddCardIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Add new card</ListItemText>
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
                            <MenuItem>
                              <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Remove this column</ListItemText>
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
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT}  - ${theme.spacing(5)})`,
              p: '0 5px',
              m: '0 5px',
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',
                borderRadius: '8px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'bfc2cf'
              }
            }}>
              <Card sx={{
                maxWidth: 345,
                maxHeight: 243,
                minHeight: 234,
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://avatars.githubusercontent.com/u/130242948?v=4s"
                  title="green iguana"
                />
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Lizard
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<GroupsIcon/>}>20</Button>
                  <Button size="small" startIcon={<GroupsIcon/>}>21</Button>
                  <Button size="small" startIcon={<GroupsIcon/>}>25</Button>
                </CardActions>
              </Card>

              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}>
                  <Typography>
                    Card01
                  </Typography>
                </CardContent>
              </Card>

            </Box>

            {/* box footer */}
            <Box sx={{
              height: COLUMN_FOOTER_HEIGHT,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2
            }}>
              <Typography sx={{ display:'flex', justifyContent: 'center', alignItems:'center', gap: 1 }}>
                <AddCardIcon/>
                Add new Card
              </Typography>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BoardContent
