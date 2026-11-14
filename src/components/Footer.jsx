import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
      <Typography variant="body2" color="text.secondary">
        © {currentYear} Dev Tinder. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
