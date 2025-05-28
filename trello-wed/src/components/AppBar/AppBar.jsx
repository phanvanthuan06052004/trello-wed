import { Box } from '@mui/material'
import ModeSelect from '../ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import TrelloIcon from '~/assets/trello.svg?react'
import Typography from '@mui/material/Typography'
import Workspace from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profiles'
import Tooltip from '@mui/material/Tooltip'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.appBarHeight,
        justifyContent: 'space-between',
        px: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#01579b' : '#2c3e50')
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
          <Link to="/boards">
            <Tooltip title="board list" sx={{ cursor: 'pointer' }}>
              <AppsIcon sx={{ color: 'white', verticalAlign: 'middle'}} />
            </Tooltip>
          </Link>
          <Link to="/" >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" sx={{ color: 'white' }} />
              <Typography variant="span" sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>
                Trello
              </Typography>
            </Box>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspace />
            <Recent />
            <Starred />
            <Templates />
            <Button
              variant="outlined"
              startIcon={<AddToPhotosIcon />}
              sx={{ color: 'white', border: 'none' }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search input */}
          <AutoCompleteSearchBoard />
          {/* Chọn chế độ hiển thị của app */}
          <ModeSelect />
          {/* xử lý lấy thông báo */}
          <Notifications />
          <Tooltip title="help" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'white' }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  )
}

export default AppBar
