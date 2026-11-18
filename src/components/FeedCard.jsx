import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

function FeedCard({ user }) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')

  return (
    <Card>
      <CardContent
        sx={{ p: 4, display: 'grid', gap: 2, justifyItems: 'center', textAlign: 'center' }}
      >
        <Avatar src={user.avtar} alt={fullName} sx={{ width: 160, height: 160 }} />
        <Typography variant="h4">{fullName}</Typography>
        <Typography>{user.bio}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {user.skills?.map((skill) => (
            <Chip key={skill} label={skill} />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default FeedCard
