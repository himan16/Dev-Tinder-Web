import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'

function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <LocalFireDepartmentIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Dev Tinder
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
