import { NavLink } from 'react-router'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PeopleIcon from '@mui/icons-material/People'
import StyleIcon from '@mui/icons-material/Style'
import useReceivedRequests from '../hooks/useReceivedRequests.js'

// NavLink adds the `active` class (and aria-current) to the link of the page you are on.
const linkSx = { '&.active': { bgcolor: 'rgba(255, 255, 255, 0.2)' } }

function NavLinks() {
  // Same query as the Connections page, so this adds one request on load and shares the cache.
  const { data: requests } = useReceivedRequests()
  const pendingCount = requests?.length

  return (
    <>
      <Tooltip title="Feed">
        <IconButton component={NavLink} to="/feeds" color="inherit" aria-label="Feed" sx={linkSx}>
          <StyleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Connections">
        <IconButton
          component={NavLink}
          to="/connections"
          color="inherit"
          aria-label={
            pendingCount ? `Connections, ${pendingCount} pending requests` : 'Connections'
          }
          sx={linkSx}
        >
          {/* The badge hides itself when the count is 0 or still loading. */}
          <Badge badgeContent={pendingCount} color="error">
            <PeopleIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  )
}

export default NavLinks
