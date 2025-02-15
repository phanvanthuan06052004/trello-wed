import { Box } from '@mui/material'
import ModeSelect from '../ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Typography from '@mui/material/Typography'
import Workspace from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profiles'
import Tooltip from '@mui/material/Tooltip'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
function Appbar() {
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
        bgcolor: ( theme ) => (theme.palette.mode === 'light' ? '#01579b' : '#2c3e50')
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
          <AppsIcon sx={{ color: 'white' }}/>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" sx={{ color: 'white' }}/>
            <Typography variant="span" sx={{ fontSize: '1.1rem', fontWeight:'bold', color:'white' }}>
              Trello
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspace />
            <Recent />
            <Starred />
            <Templates />
            <Button
              variant="outlined"
              startIcon={ <AddToPhotosIcon/>}
              sx={{ color: 'white', border: 'none' }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="outlined-basic-search"
            label="Search..."
            variant="outlined"
            size='small'
            sx={{
              minWidth: 120,
              maxWidth: 180,
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    sx={{
                      cursor: 'pointer',
                      color: () => (searchValue ? 'white' : 'transparent')
                    }}
                    onClick={() => setSearchValue('')}
                  />
                </InputAdornment>
              )
            }}
          />
          <ModeSelect />
          <Badge color="error" variant="dot" sx={{ cursor: 'pointer' }}>
            <Tooltip title="informations">
              <NotificationsNoneIcon sx={{ color: 'white' }}/>
            </Tooltip>
          </Badge>
          <Tooltip title="help" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'white' }}/>
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  )
}

export default Appbar
