import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FeedCard from '../components/FeedCard.jsx'
import useFeed from '../hooks/useFeed.js'
import useSendRequest from '../hooks/useSendRequest.js'

function Feeds() {
  const { data, isPending, isFetching, isError, error, refetch } = useFeed()
  const sendRequestMutation = useSendRequest()

  // First load, or the deck ran out while the next batch is still on its way.
  if (isPending || (data?.users.length === 0 && isFetching)) {
    return (
      <Container maxWidth="sm">
        <Skeleton variant="rounded" height={420} />
      </Container>
    )
  }

  // Only a failure with nothing to show. A failed background refetch keeps the cards on screen.
  if (isError && !data) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" action={<Button onClick={() => refetch()}>Retry</Button>}>
          {error.message}
        </Alert>
      </Container>
    )
  }

  const currentFeedCard = data.users[0]

  if (!currentFeedCard) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h5">You're all caught up</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          No more developers to show right now.
        </Typography>
        <Button variant="outlined" onClick={() => refetch()}>
          Check again
        </Button>
      </Container>
    )
  }

  const swipe = (status) => sendRequestMutation.mutate({ status, userId: currentFeedCard._id })

  return (
    <Container maxWidth="sm" sx={{ display: 'grid', gap: 3 }}>
      {sendRequestMutation.isError && (
        <Alert severity="error">{sendRequestMutation.error.message}</Alert>
      )}
      {/* `key` gives each person a fresh card, so the avatar doesn't flash the previous image. */}
      <FeedCard key={currentFeedCard._id} user={currentFeedCard} />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <IconButton
          aria-label="Pass"
          color="error"
          onClick={() => swipe('ignored')}
          sx={{ border: 2, p: 2 }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="Like"
          color="primary"
          onClick={() => swipe('interested')}
          sx={{ border: 2, p: 2 }}
        >
          <FavoriteIcon fontSize="large" />
        </IconButton>
      </Box>
    </Container>
  )
}

export default Feeds
