import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import useLogout from '../hooks/useLogout.js'

function NavBar() {
  const logoutMutation = useLogout()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <LocalFireDepartmentIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Dev Tinder
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
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
