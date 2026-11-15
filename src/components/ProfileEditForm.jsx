import { useActionState, useState } from 'react'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useUpdateProfile from '../hooks/useUpdateProfile.js'
import { ApiError } from '../services/request.js'

function ProfileEditForm({ user, onDone }) {
  const updateMutation = useUpdateProfile()
  // Autocomplete is not a native input, so the skills live in state and reach the form as hidden inputs.
  const [skills, setSkills] = useState(user.skills ?? [])
  const [avatarPreview, setAvatarPreview] = useState(user.avtar)

  const [state, submitAction, isPending] = useActionState(
    async (previous, formData) => {
      const values = {
        firstName: formData.get('firstName').trim(),
        lastName: formData.get('lastName').trim(),
        age: formData.get('age'),
        gender: formData.get('gender'),
        avtar: formData.get('avtar').trim(),
        bio: formData.get('bio').trim(),
      }
      const details = {
        ...values,
        age: Number(values.age),
        // The backend rejects an empty string here, so a cleared last name is sent as null.
        lastName: values.lastName || null,
        skills: formData.getAll('skills'),
      }
      // A blank URL would replace the picture with an empty string, so keep the current one instead.
      if (!details.avtar) {
        delete details.avtar
      }

      try {
        await updateMutation.mutateAsync(details)
        onDone()
        return previous
      } catch (error) {
        const isApiError = error instanceof ApiError
        return {
          values,
          errors: isApiError ? error.errors : {},
          message: isApiError ? error.message : 'Could not reach the server. Please try again.',
        }
      }
    },
    {
      // Starts from what is saved. The form only mounts in edit mode, so this is always fresh.
      values: {
        firstName: user.firstName,
        lastName: user.lastName ?? '',
        age: String(user.age),
        gender: user.gender,
        avtar: user.avtar ?? '',
        bio: user.bio ?? '',
      },
      errors: {},
      message: null,
    },
  )

  // React resets the form's uncontrolled fields after an action, so the submitted values go back in
  // as defaultValue. That keeps what the user typed when the save fails.
  const fieldProps = (name) => ({
    name,
    defaultValue: state.values[name],
    error: Boolean(state.errors[name]),
    helperText: state.errors[name],
  })

  return (
    <Box component="form" action={submitAction} sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="h5">Edit profile</Typography>
      {/* A message with no per-field errors is a general failure (server down, 500). */}
      {state.message && Object.keys(state.errors).length === 0 && (
        <Alert severity="error">{state.message}</Alert>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={avatarPreview} alt={user.firstName} sx={{ width: 64, height: 64 }} />
        <TextField
          label="Avatar URL"
          type="url"
          fullWidth
          {...fieldProps('avtar')}
          onChange={(event) => setAvatarPreview(event.target.value)}
          helperText={state.errors.avtar ?? 'Leave blank to keep your current picture'}
        />
      </Box>
      <TextField
        label="First name"
        required
        slotProps={{ htmlInput: { minLength: 3, maxLength: 50 } }}
        {...fieldProps('firstName')}
      />
      <TextField
        label="Last name"
        slotProps={{ htmlInput: { minLength: 3, maxLength: 50 } }}
        {...fieldProps('lastName')}
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
      <TextField label="Bio" multiline minRows={3} {...fieldProps('bio')} />
      <Autocomplete
        multiple
        freeSolo
        autoSelect
        options={[]}
        value={skills}
        onChange={(event, value) => {
          // Trim, drop blanks and duplicates.
          setSkills([...new Set(value.map((skill) => skill.trim()).filter(Boolean))])
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Skills"
            helperText={state.errors.skills ?? 'Type a skill and press Enter'}
            error={Boolean(state.errors.skills)}
          />
        )}
      />
      {skills.map((skill) => (
        <input key={skill} type="hidden" name="skills" value={skill} />
      ))}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="button" onClick={onDone} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Saving…' : 'Save'}
        </Button>
      </Box>
    </Box>
  )
}

export default ProfileEditForm
