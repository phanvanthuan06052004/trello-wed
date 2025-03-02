
export function capitalizeFirstLetter (val) {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// xử lí đặt chỗ cho column khi card rỗng
export const generatePlaceholderCard = ( column ) => {
  return {
    _id: `${column?._id}-FE-Placeholder-Card`,
    boardId: `${column?.boardId}`,
    columnId: `${column?._id}`,
    FE_PlaceholderCard: true
  }
}