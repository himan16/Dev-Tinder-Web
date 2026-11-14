import { Navigate, Outlet } from 'react-router'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import useCurrentUser from '../hooks/useCurrentUser.js'

function RequireAuth() {
  const { data: user, isPending, isError } = useCurrentUser()

  // Wait for the "who am I?" answer, otherwise every refresh would flash /login.
  if (isPending) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">Could not reach the server. Please try again.</Alert>
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default RequireAuth
