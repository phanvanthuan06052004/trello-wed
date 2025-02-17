import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import GroupsIcon from '@mui/icons-material/Groups'


function Card({ temporaryHiddenMedia }) {
  if (temporaryHiddenMedia) {
    return (
      <>
        <MuiCard sx={{
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
        </MuiCard>
      </>
    )
  }
  return (
    <>
      <MuiCard sx={{
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
      </MuiCard>


    </>
  )
}

export default Card
