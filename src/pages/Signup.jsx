import { useActionState } from 'react'
import { Link as RouterLink, Navigate } from 'react-router'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useCurrentUser from '../hooks/useCurrentUser.js'
import useSignup from '../hooks/useSignup.js'
import { ApiError } from '../services/request.js'

const INITIAL_STATE = { values: {}, errors: {}, message: null }

function Signup() {
  const { data: user } = useCurrentUser()
  const signupMutation = useSignup()

  // React 19: the function runs when the form is submitted. `state` is whatever it last returned,
  // `submitAction` goes on <form action>, and `isPending` is true while it runs.
  const [state, submitAction, isPending] = useActionState(async (previous, formData) => {
    const values = {
      firstName: formData.get('firstName').trim(),
      lastName: formData.get('lastName').trim(),
      email: formData.get('email').trim(),
      age: formData.get('age'),
      gender: formData.get('gender'),
    }
    const details = { ...values, age: Number(values.age), password: formData.get('password') }
    // The backend rejects an empty lastName (minimum 3 characters), so leave it out when blank.
    if (!details.lastName) {
      delete details.lastName
    }

    try {
      await signupMutation.mutateAsync(details)
      return previous
    } catch (error) {
      const isApiError = error instanceof ApiError
      return {
        values,
        errors: isApiError ? error.errors : {},
        message: isApiError ? error.message : 'Could not reach the server. Please try again.',
      }
    }
  }, INITIAL_STATE)

  // A successful signup puts the user in the cache, which lands here too.
  if (user) {
    return <Navigate to="/feeds" replace />
  }

  // After an action finishes React resets the form's uncontrolled fields, which would wipe what the
  // user typed. Handing back the submitted values as defaultValue (never the password) restores them.
  const fieldProps = (name) => ({
    name,
    defaultValue: state.values[name] ?? '',
    error: Boolean(state.errors[name]),
    helperText: state.errors[name],
  })

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Paper component="form" action={submitAction} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="h4">Sign up</Typography>
          {/* A message with no per-field errors is a general failure (server down, 500). */}
          {state.message && Object.keys(state.errors).length === 0 && (
            <Alert severity="error">{state.message}</Alert>
          )}
          <TextField
            label="First name"
            required
            slotProps={{ htmlInput: { minLength: 3, maxLength: 50 } }}
            {...fieldProps('firstName')}
          />
          <TextField
            label="Last name (optional)"
            slotProps={{ htmlInput: { minLength: 3, maxLength: 50 } }}
            {...fieldProps('lastName')}
          />
          <TextField label="Email" type="email" required {...fieldProps('email')} />
          <TextField
            label="Password"
            type="password"
            required
            slotProps={{ htmlInput: { minLength: 8, maxLength: 72 } }}
            error={Boolean(state.errors.password)}
            helperText={state.errors.password ?? 'At least 8 characters'}
            name="password"
          />
          <TextField
            label="Age"
            type="number"
            required
            slotProps={{ htmlInput: { min: 18 } }}
            {...fieldProps('age')}
          />
          <TextField label="Gender" select required {...fieldProps('gender')}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Signing up…' : 'Sign up'}
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default Signup
