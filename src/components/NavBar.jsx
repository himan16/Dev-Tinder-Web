import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import useCurrentUser from '../hooks/useCurrentUser.js'
import UserMenu from './UserMenu.jsx'

function NavBar() {
  const { data: user } = useCurrentUser()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <LocalFireDepartmentIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Dev Tinder
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* `user` turns null for a moment on logout, before RequireAuth redirects. */}
        {user && <UserMenu user={user} />}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
