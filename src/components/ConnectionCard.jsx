import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// A wide, horizontal card with just the avatar and the full name.
function ConnectionCard({ person }) {
  const fullName = [person.firstName, person.lastName].filter(Boolean).join(' ')

  return (
    <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
      <Avatar src={person.avtar} alt={fullName} sx={{ width: 64, height: 64 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="h6" noWrap>
          {fullName}
        </Typography>
      </Box>
    </Card>
  )
}

export default ConnectionCard
