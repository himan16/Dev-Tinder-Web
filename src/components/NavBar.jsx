import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import useCurrentUser from '../hooks/useCurrentUser.js'
import useLogout from '../hooks/useLogout.js'

function NavBar() {
  const { data: user } = useCurrentUser()
  const logoutMutation = useLogout()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <LocalFireDepartmentIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Dev Tinder
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* `user` turns null for a moment on logout, before RequireAuth redirects. */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              Hi! {user.firstName}
            </Typography>
            <Avatar src={user.avtar} alt={user.firstName} />
          </Box>
        )}
        <Button
          color="inherit"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
