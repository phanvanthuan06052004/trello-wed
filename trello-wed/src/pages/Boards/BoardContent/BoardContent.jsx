/* eslint-disable no-trailing-spaces */
import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { mapOrder } from '~/utils/Sort'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, getFirstCollision } from '@dnd-kit/core'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/Listcards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN'
}
function BoardContent({ board }) {
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })

  const columnSensors = useSensors(
    mouseSensor,
    touchSensor
  )

  const [orderedColumns, setOrderedColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState([])
  const [activeDragItemType, setActiveDragItemType] = useState([])
  const [activeDragItemData, setActiveDragItemData] = useState([])
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState([])

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const lastOverId = useRef(null)

  const collisionDetectionStrategy = useCallback((args) => {
    //TH kéo column thì dùng connor
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ... args })
    }

    // Tìm các điểm giao nhau với con trỏ
    const pointerIntersections = pointerWithin(args)

    // ngoài vùng kéo thì khoong làm gì cả cho khỏe
    if (!pointerIntersections?.length) return
    // Thuật toán phát hiện va chạm và trả về 1 mảng va chạm tại đây
    //const intersections = !!pointerIntersections.length ? pointerIntersections : rectIntersection(args)

    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {
      const checkColumn = orderedColumns.find(c => c._id === overId)
      if (checkColumn) {
      //khi over qua thì nó chọn card chứ không phải column
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])
  // xử lí api khi board thay đổi
  useEffect(() => {
    setOrderedColumns(() => mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = ( cardId ) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns( prevColumns => {

      const overCardIndex = overColumn?.cards?.findIndex(x => x._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(x => x._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(x => x._id === overColumn._id)

      // column cũ trước khi kéo
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(x => x._id !== activeDraggingCardId)
        // xử lí khi card bị rỗng thì thêm card giữ chỗ
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(x => x._id)
      }

      //column mới sau khi kéo
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(x => x._id !== activeDraggingCardId)
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
        nextOverColumn.cards = nextOverColumn.cards.filter(x => !x.FE_PlaceholderCard) // Xử lý cho trường hợp dư thừa data giữ chỗ (xóa cho đơ rác)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(x => x._id)
      }
      
      return nextColumns
    })
  }

  const handleDragStart = ( event ) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    if ( event?.active?.data?.current?.columnId ) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // trigger trong quá trình kéo phần tử
  const handleDragOver = ( event ) => {
    // Không làm gì hết khi kéo thả cột
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event

    // Tránh crash trang khi kéo quá phạm vi container
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    // Tìm column dựa vào cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }

  }
  // console.log(activeDragItemData)
  function handleDragEnd(event) {
    const { active, over } = event

    // Tránh crash trang khi kéo quá phạm vi container
    if (!active || !over) return

    // xử lí khi kéo Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
  
      // Tìm column dựa vào cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
  
      if (!activeColumn || !overColumn) return
  
      // Có thể dùng activeDraggingData để thay thế cho old nhưng không nên
      // Bởi vì có bug khi kéo qua lại giữa 2 column thì id nó không đổi dẫn đến đẫn vào trường hợp else và sai
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {

        const oldIndexCard = oldColumnWhenDraggingCard?.cards.findIndex(c => c._id == activeDragItemId)
        const newIndexCard = overColumn?.cards.findIndex(c => c._id == over.id)
  
        const newOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldIndexCard, newIndexCard)

        setOrderedColumns( prevColumns => {
          const nextColumns = cloneDeep(prevColumns) // clone danh sách các column
          const targetColumn = nextColumns.find(x => x._id === overColumn._id) // lấy column đang thao tác kéo các card
          // set lại các giá card và thứ tự
          targetColumn.cards = newOrderedCards
          targetColumn.cardOrderIds = newOrderedCards.map(x => x._id)

          return nextColumns
        })
      }

    }

    // xử lí khi kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndexColumn = orderedColumns.findIndex(c => c._id == active.id)
        const newIndexColumn = orderedColumns.findIndex(c => c._id == over.id)
  
        const neworderedColumns = arrayMove(orderedColumns, oldIndexColumn, newIndexColumn)
        setOrderedColumns(neworderedColumns)
  
        //   setOrderedColumns((items) => {
        //     const oldIndexColumn = items.indexOf(active.id)
        //     const newIndexColumn = items.indexOf(over.id)
  
      //     return arrayMove(items, oldIndexColumn, newIndexColumn) //sắp xếp dựa trên vị trí mới và cũ
      //     // doc: https://github.com/search?q=repo%3Aclauderic%2Fdnd-kit%20arrayMove&type=code
      //     // sau này phải thêm logic sử lí lưu thứ tự vào DB tránh F5 mất vị trí
      //   })
      }
    }
    
    setActiveDragItemType(null)
    setActiveDragItemId(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  
  return (
    <>
      {/* box content */}
      <DndContext
        // collisionDetection={closestCorners}
        collisionDetection={collisionDetectionStrategy}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={columnSensors}>
        <Box sx={{
          display: 'flex',
          height: (theme) => (theme.trello.boardContentHeight),
          backgroundColor: ( theme ) => (theme.palette.mode === 'light' ? '#1976d2' : '#34495e'),
          borderTop: '1px solid white',
          p: '10px 0'
        }}>
          <ListColumns columns={orderedColumns}/>
          <DragOverlay dropAnimation={dropAnimation}>
            {(!activeDragItemId || !activeDragItemType ) && null}
            {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
            {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
          </DragOverlay>
        </Box>
      </DndContext>
    </>
  )
}

export default BoardContent
