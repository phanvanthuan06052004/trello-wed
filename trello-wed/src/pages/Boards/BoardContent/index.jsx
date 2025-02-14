import { Box } from '@mui/material'
function BoardContent() {
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        backgroundColor: 'primary.50'
      }}>
        Content
      </Box>
    </>
  )
}

export default BoardContent
