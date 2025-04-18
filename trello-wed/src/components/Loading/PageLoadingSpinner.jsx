import { Box, CircularProgress, Typography } from '@mui/material'

function PageLoadingSpinner({ caption }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      height: '100vh',
      width: '100vw'
    }}>
      <CircularProgress size={50} color="primary" />
      <Typography variant="h6" color="primary" >
        {caption}
      </Typography>
    </Box>
  )

}
export default PageLoadingSpinner