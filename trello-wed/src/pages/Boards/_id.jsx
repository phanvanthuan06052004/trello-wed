import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import { cloneDeep } from 'lodash'
import { updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardDifferenceColumnAPI } from '~/Apis'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardDetailsAPI, selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
function Board() {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard) // lấy data từ redux
  // const boardId = '67e23e3ef43f67ae0a1d8964'
  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

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

  if (!board) {
    return <PageLoadingSpinner caption='Loading ....'/>
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      {/* chỉ khi có trong redux thì mới active, bắt sự kiện mỗi khi click 1 card cụ thể */}
      <ActiveCard />
      <AppBar />
      <BoardBar board={board} />
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
