import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { fetchBoarDetailsAPI, createNewCardAPI, createNewColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardDifferenceColumnAPI } from '~/Apis'
import { generatePlaceholderCard } from '~/utils/formatters'
function Board() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67d3f92369d12e62beea8e16'
    fetchBoarDetailsAPI(boardId)
      .then(board => {
        // kiểm tra các column nào vừa tạo mà không có card thì đặt card place holder
        // Dành cho khi nhấn f5 trang nó mới load và kiểm tra
        board.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          }
        })
        setBoard(board)
      })
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
    // tiến hành kiểm tra coi có placehokder nào không thì thêm 
    if (isEmpty(newBoard.columns[newBoard.columns.length - 1].cards)) {
      newBoard.columns[newBoard.columns.length - 1].cards = [generatePlaceholderCard(newBoard.columns[newBoard.columns.length - 1])]
      newBoard.columns[newBoard.columns.length - 1].cardOrderIds = [generatePlaceholderCard(newBoard.columns[newBoard.columns.length - 1])._id]
    }
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
      // xử lý còn dư FE_PlaceholderCard khi tạo mới card
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [result]
        columnToUpdate.cardOrderIds = [result._id]
      }
      else { // tạo mới card và ko quan tâm tới FE_PlaceholderCard
        columnToUpdate.cards.push(result)
        columnToUpdate.cardOrderIds.push(result._id)
      }
    }
    setBoard(newBoard)
  }

  const moveColumn = async (newOrderedColumns) => {
    const orderedColumn = newOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columnOrderIds = orderedColumn
    newBoard.columns = newOrderedColumns
    setBoard(newBoard)

    await updateBoardDetailsAPI(board._id, {
      columnOrderIds: orderedColumn
    })
  }

  const moveCardSameColumn = async (listCard, listCardId, columnId) => {

    // handle refresh page
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(Column => Column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = listCard
      columnToUpdate.cardOrderIds = listCardId
    }
    setBoard(newBoard)

    // call API to update
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: listCardId
    })
  }

  const moveCardDifferenceColumn = async (dragCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {

    // handle refresh page
    const nextColumnOrderIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columnOrderIds = nextColumnOrderIds
    newBoard.columns = dndOrderedColumns
    setBoard(newBoard)

    // xử lý -FE-Placeholder-Card khi kéo hết card và cập nhật column củ
    let prevCardOrderedIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderedIds[0].includes('-Placeholder-Card')) {
      prevCardOrderedIds = []
    }
    // call API to update
    moveCardDifferenceColumnAPI({
      dragCardId,
      prevColumnId,
      prevCardOrderedIds,
      nextColumnId,
      nextCardOrderedIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
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
        moveCardSameColumn={moveCardSameColumn}
        moveCardDifferenceColumn={moveCardDifferenceColumn}
      />
    </Container>
  )
}

export default Board
