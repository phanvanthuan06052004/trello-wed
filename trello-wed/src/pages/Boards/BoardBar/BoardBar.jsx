import { Box } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { capitalizeFirstLetter } from '~/utils/formatters'
import Tooltip from '@mui/material/Tooltip'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
const BOARD_CSS = {
  color: 'white',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  borderRadius: '4px',
  bgcolor: 'transparent',
  border: 'none',
  '&:hover':{
    bgcolor: 'primary.50'
  }
}
function BoardBar({ board }) {
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.boardBarHeight,
        borderTop: '1px solid #000',
        justifyContent: 'space-between',
        px: 1.5,
        overflowX: 'auto',
        bgcolor: ( theme ) => (theme.palette.mode === 'light' ? '#1976d2' : '#34495e')
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
          <Tooltip title={board?.description}>
            <Chip
              icon={<DashboardIcon />}
              label={board?.title}
              clickable
              sx={BOARD_CSS}
            />
          </Tooltip>
          <Chip
            icon={<VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type)}
            clickable
            sx={BOARD_CSS}
          />
          <Chip
            icon={<AddToDriveIcon />}
            label="Add to Google drive"
            clickable
            sx={BOARD_CSS}
          />
          <Chip
            icon={<BoltIcon />}
            label="Automation"
            clickable
            sx={BOARD_CSS}
          />
          <Chip
            icon={<FilterListIcon />}
            label="Filter"
            clickable
            sx={BOARD_CSS}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
          <InviteBoardUser boardId={board._id}/>

          <BoardUserGroup boardUsers={board?.FE_allMembers}/>
        </Box>
      </Box>
    </>
  )
}

export default BoardBar
