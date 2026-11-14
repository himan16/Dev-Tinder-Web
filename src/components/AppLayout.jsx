import { Outlet } from 'react-router'
import Box from '@mui/material/Box'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'

function AppLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default AppLayout
