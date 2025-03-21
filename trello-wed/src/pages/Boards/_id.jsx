import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoarDetailsAPI, createNewCardAPI, createNewColumnAPI, updateBoarDetailsAPI } from '~/Apis'
function Board() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67d3f92369d12e62beea8e16'
    fetchBoarDetailsAPI(boardId)
      .then(board => setBoard(board))
  }, [])

  const createNewColumn = async (data) => {
    const result = await createNewColumnAPI({
      ...data,
      boardId: board._id
    })

    // refet lại data
    const newBoard = { ...board }
    newBoard.columnOrderIds.push(result._id)
    newBoard.columns.push(result)
    setBoard(newBoard)
  }

  const createNewCard = async (data) => {
    const result = await createNewCardAPI({
      ...data,
      boardId: board._id
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(Column => Column._id === result.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(result)
      columnToUpdate.cardOrderIds.push(result._id)
    }
    setBoard(newBoard)
  }

  const moveColumn = async (newOrderedColumns) => {
    const orderedColumn = newOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columnOrderIds = orderedColumn
    newBoard.columns = newOrderedColumns
    setBoard(newBoard)

    await updateBoarDetailsAPI(board._id, {
      columnOrderIds: orderedColumn
    })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent
        createNewCard={createNewCard}
        createNewColumn={createNewColumn}
        board={board}
        moveColumn={moveColumn}
      />
    </Container>
  )
}

export default Board
