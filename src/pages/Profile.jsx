import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import ProfileEditForm from '../components/ProfileEditForm.jsx'
import ProfileView from '../components/ProfileView.jsx'
import useCurrentUser from '../hooks/useCurrentUser.js'

function Profile() {
  const { data: user } = useCurrentUser()
  const [isEditing, setIsEditing] = useState(false)

  // RequireAuth guarantees a user, but it turns null for a moment on logout.
  if (!user) {
    return null
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent sx={{ p: 4 }}>
          {isEditing ? (
            <ProfileEditForm user={user} onDone={() => setIsEditing(false)} />
          ) : (
            <ProfileView user={user} onEdit={() => setIsEditing(true)} />
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default Profile
