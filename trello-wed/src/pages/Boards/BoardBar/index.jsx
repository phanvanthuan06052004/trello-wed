import { Box } from '@mui/material'
function BoardBar() {
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.boardBarHeight,
        backgroundColor: 'primary.dark'
      }}>
        Board Bar
      </Box>
    </>
  )
}

export default BoardBar
