import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { mockData } from '../../Apis/mock-data'
import { fetchBoarDetailsAPI } from '~/Apis'
function Board() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67d3f92369d12e62beea8e16'
    fetchBoarDetailsAPI(boardId)
      .then(board => setBoard(board))
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board}/>
    </Container>
  )
}

export default Board
