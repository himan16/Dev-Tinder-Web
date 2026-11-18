import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import useConnections from '../hooks/useConnections.js'
import ConnectionCard from './ConnectionCard.jsx'

function ConnectionsList() {
  const { data: connections, isPending, isError, error, refetch } = useConnections()

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

  if (connections.length === 0) {
    return (
      <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
        No connections yet. Keep swiping!
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {connections.map((person) => (
        <ConnectionCard key={person._id} person={person} />
      ))}
    </Box>
  )
}

export default ConnectionsList
