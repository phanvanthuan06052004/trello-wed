import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent'
import { mockData } from '~/Apis/mock-data'
import { mapOrder } from '~/utils/Sort'

function Board() {
  const columnSorted = mapOrder(mockData?.board?.columns, mockData?.board?.columnOrderIds, '_id')
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData?.board}/>
      <BoardContent columns={columnSorted}/>
    </Container>
  )
}

export default Board
