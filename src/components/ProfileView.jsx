import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'

function ProfileView({ user, onEdit }) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')

  return (
    <Box sx={{ display: 'grid', gap: 2, justifyItems: 'center', textAlign: 'center' }}>
      <Avatar src={user.avtar} alt={fullName} sx={{ width: 120, height: 120 }} />
      <Box>
        <Typography variant="h4">{fullName}</Typography>
        <Typography color="text.secondary" sx={{ textTransform: 'capitalize' }}>
          {user.age} · {user.gender}
        </Typography>
      </Box>
      <Typography>{user.bio}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        {user.skills?.length > 0 ? (
          user.skills.map((skill) => <Chip key={skill} label={skill} />)
        ) : (
          <Typography variant="body2" color="text.secondary">
            No skills added yet
          </Typography>
        )}
      </Box>
      <Button variant="contained" startIcon={<EditIcon />} onClick={onEdit}>
        Edit profile
      </Button>
    </Box>
  )
}

export default ProfileView
