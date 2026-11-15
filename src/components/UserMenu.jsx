import { useState } from 'react'
import { Link as RouterLink } from 'react-router'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import useLogout from '../hooks/useLogout.js'

function UserMenu({ user }) {
  // The element the menu is anchored to; null means the menu is closed.
  const [anchorEl, setAnchorEl] = useState(null)
  const logoutMutation = useLogout()

  const handleClose = () => setAnchorEl(null)

  const handleLogout = () => {
    handleClose()
    logoutMutation.mutate()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Hi! {user.firstName}</Typography>
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-label="Open user menu"
        aria-haspopup="menu"
        aria-controls={anchorEl ? 'user-menu' : undefined}
        aria-expanded={anchorEl ? 'true' : undefined}
        size="small"
      >
        <Avatar src={user.avtar} alt={user.firstName} />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem component={RouterLink} to="/settings" onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} disabled={logoutMutation.isPending}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu
