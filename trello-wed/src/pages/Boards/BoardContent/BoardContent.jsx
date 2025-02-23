import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { mapOrder } from '~/utils/Sort'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/Listcards/Card/Card'

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

  const [orderedColumn, setOrderedColumn] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState([])
  const [activeDragItemType, setActiveDragItemType] = useState([])
  const [activeDragItemData, setActiveDragItemData] = useState([])

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }


  // xử lí api khi board thay đổi
  useEffect(() => {
    setOrderedColumn(() => mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = ( event ) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  // console.log(activeDragItemData)
  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) { return }

    if (active.id !== over.id) {
      const oldIndex = orderedColumn.findIndex(c => c._id == active.id)
      const newIndex = orderedColumn.findIndex(c => c._id == over.id)

      const newOrderedColumn = arrayMove(orderedColumn, oldIndex, newIndex)
      setOrderedColumn(newOrderedColumn)

      //   setOrderedColumn((items) => {
      //     const oldIndex = items.indexOf(active.id)
      //     const newIndex = items.indexOf(over.id)

    //     return arrayMove(items, oldIndex, newIndex) //sắp xếp dựa trên vị trí mới và cũ
    //     // doc: https://github.com/search?q=repo%3Aclauderic%2Fdnd-kit%20arrayMove&type=code
    //     // sau này phải thêm logic sử lí lưu thứ tự vào DB tránh F5 mất vị trí
    //   })
    }
  }
  return (
    <>
      {/* box content */}
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={columnSensors}>
        <Box sx={{
          display: 'flex',
          height: (theme) => (theme.trello.boardContentHeight),
          backgroundColor: ( theme ) => (theme.palette.mode === 'light' ? '#1976d2' : '#34495e'),
          borderTop: '1px solid white',
          p: '10px 0'
        }}>
          <ListColumns columns={orderedColumn}/>
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
