import { Box } from '@mui/material'
import Card from './Card/Card'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
function Listcards() {
  return (
    <>
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

        <Card temporaryHiddenMedia/>
      </Box>
    </>
  )
}

export default Listcards
