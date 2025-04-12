import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import { isEmpty, cloneDeep } from 'lodash'
import { createNewCardAPI, createNewColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardDifferenceColumnAPI, deleteColumnDetailsAPI } from '~/Apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardDetailsAPI, selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard) // lấy data từ redux

  useEffect(() => {
    const boardId = '67e23e3ef43f67ae0a1d8964'
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch])



  const moveColumn = async (newOrderedColumns) => {
    const orderedColumn = newOrderedColumns.map(c => c._id)

    /**
     * Trường hợp này thì không sao nó không phải push vào làm thay đổi mà là gán lại toàn bộ giá trị 
     */
    const newBoard = { ...board }
    newBoard.columnOrderIds = orderedColumn
    newBoard.columns = newOrderedColumns
    dispatch(updateCurrentActiveBoard(newBoard))

    await updateBoardDetailsAPI(board._id, {
      columnOrderIds: orderedColumn
    })
  }

  const moveCardSameColumn = async (listCard, listCardId, columnId) => {

    /**
     * trường hợp này vi phạm vì nó phải can thiệp sâu vào dữ liệu
     * error: Cannot assign to read only property 'card' of object
     */
    // handle refresh page
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(Column => Column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = listCard
      columnToUpdate.cardOrderIds = listCardId
    }
    dispatch(updateCurrentActiveBoard(newBoard))

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
    dispatch(updateCurrentActiveBoard(newBoard))

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

  const deleteColumnDetails = async (columnId) => {
    
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent

        board={board}
        moveColumn={moveColumn}
        moveCardSameColumn={moveCardSameColumn}
        moveCardDifferenceColumn={moveCardDifferenceColumn}
      />
    </Container>
  )
}

export default Board
