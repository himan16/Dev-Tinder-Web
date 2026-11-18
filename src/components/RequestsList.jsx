import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import useNotify from '../hooks/useNotify.js'
import useReceivedRequests from '../hooks/useReceivedRequests.js'
import useReviewRequest from '../hooks/useReviewRequest.js'
import { ApiError } from '../services/request.js'
import RequestCard from './RequestCard.jsx'

function RequestsList() {
  const { data: requests, isPending, isError, error, refetch } = useReceivedRequests()
  const notify = useNotify()

  // The mutation lives here, not in each row: a row unmounts as soon as it is removed optimistically,
  // and this list stays mounted, so the feedback below always shows.
  const reviewMutation = useReviewRequest({
    onSuccess: (data, { status }, context) => {
      const name = context?.removedRequest?.fromUserId.firstName ?? 'this user'
      if (status === 'accepted') {
        notify(`You and ${name} are now connected`)
      } else {
        notify(`Request from ${name} rejected`, 'info')
      }
    },
    onError: (reviewError) => {
      const alreadyHandled = reviewError instanceof ApiError && reviewError.status === 404
      notify(
        alreadyHandled ? 'That request was already handled' : reviewError.message,
        alreadyHandled ? 'warning' : 'error',
      )
    },
  })

  if (isPending) {
    return (
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Skeleton variant="rounded" height={96} />
        <Skeleton variant="rounded" height={96} />
        <Skeleton variant="rounded" height={96} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Alert severity="error" action={<Button onClick={() => refetch()}>Retry</Button>}>
        {error.message}
      </Alert>
    )
  }

  if (requests.length === 0) {
    return (
      <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
        No pending requests
      </Typography>
    )
  }

  const review = (status, requestId) => reviewMutation.mutate({ status, requestId })

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {requests.map((request) => (
        <RequestCard key={request._id} request={request} onReview={review} />
      ))}
    </Box>
  )
}

export default RequestsList
