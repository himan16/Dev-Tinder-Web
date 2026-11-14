import { useState } from 'react'
import { useNavigate } from 'react-router'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useAuth from '../hooks/useAuth.js'
import useLogin from '../hooks/useLogin.js'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsLoggedIn } = useAuth()
  const navigate = useNavigate()

  const loginMutation = useLogin({
    onSuccess: () => {
      setIsLoggedIn(true)
      navigate('/feeds', { replace: true })
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    loginMutation.mutate({ email, password })
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 4, width: '100%', maxWidth: 400, display: 'grid', gap: 2 }}
      >
        <Typography variant="h4">Login</Typography>
        {loginMutation.isError && (
          <Alert severity="error">{loginMutation.error.message}</Alert>
        )}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button type="submit" variant="contained" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Logging in…' : 'Login'}
        </Button>
      </Paper>
    </Box>
  )
}

export default Login
