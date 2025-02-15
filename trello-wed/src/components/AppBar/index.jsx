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
function Appbar() {
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.appBarHeight,
        justifyContent: 'space-between',
        px: 2,
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }}/>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" sx={{ color: 'primary.main' }}/>
            <Typography variant="span" sx={{ fontSize: '1.1rem', fontWeight:'bold', color:'primary.main' }}>
              Trello
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspace />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined" startIcon={ <AddToPhotosIcon/>}>Create</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField id="outlined-basic-search" label="Search..." variant="outlined" size='small' sx={{ minWidth: 120 }}/>
          <ModeSelect />
          <Badge color="error" variant="dot" sx={{ cursor: 'pointer' }}>
            <Tooltip title="informations">
              <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
            </Tooltip>
          </Badge>
          <Tooltip title="help" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'primary.main' }}/>
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  )
}

export default Appbar
