import { Link as RouterLink } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import useCurrentUser from '../hooks/useCurrentUser.js'
import NavLinks from './NavLinks.jsx'
import UserMenu from './UserMenu.jsx'

function NavBar() {
  const { data: user } = useCurrentUser()

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* The logo and title link home. */}
        <Box
          component={RouterLink}
          to="/feeds"
          sx={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
        >
          <LocalFireDepartmentIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Dev Tinder
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {/* `user` turns null for a moment on logout, before RequireAuth redirects. */}
        {user && (
          <>
            <NavLinks />
            <Box sx={{ ml: 2 }}>
              <UserMenu user={user} />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
