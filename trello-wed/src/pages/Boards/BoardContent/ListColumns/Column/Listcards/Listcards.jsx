import { Box } from '@mui/material'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
function Listcards({ cards }) {
  return (
    <>
      <SortableContext items={cards.map(c => c._id)} strategy={verticalListSortingStrategy}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT}  - ${theme.spacing(5)})`,
          p: '0 5px 5px 5px',
          m: '0 5px',
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
            borderRadius: '8px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'bfc2cf'
          }
        }}>
          {cards.map((data) => <Card key={data._id} card={data}/>)}
        </Box>
      </SortableContext>
    </>
  )
}

export default Listcards
