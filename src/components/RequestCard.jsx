import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

// A wide card for a received request: the sender's profile on the left, Accept / Reject on the right.
function RequestCard({ request, onReview }) {
  const sender = request.fromUserId
  const fullName = [sender.firstName, sender.lastName].filter(Boolean).join(' ')
  // The backend doesn't send every field for everyone, so only show what exists.
  const details = [sender.age, sender.gender].filter(Boolean).join(' · ')

  return (
    <Card variant="outlined" sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2 }}>
      <Avatar src={sender.avtar} alt={fullName} sx={{ width: 96, height: 96 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="h6" noWrap>
          {fullName}
        </Typography>
        {details && (
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {details}
          </Typography>
        )}
        {sender.bio && <Typography sx={{ mt: 1 }}>{sender.bio}</Typography>}
        {sender.skills?.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {sender.skills.map((skill) => (
              <Chip key={skill} label={skill} size="small" />
            ))}
          </Box>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Sent {new Date(request.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          aria-label={`Reject ${sender.firstName}`}
          color="error"
          onClick={() => onReview('rejected', request._id)}
          sx={{ border: 1 }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          aria-label={`Accept ${sender.firstName}`}
          color="success"
          onClick={() => onReview('accepted', request._id)}
          sx={{ border: 1 }}
        >
          <CheckIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

export default RequestCard
