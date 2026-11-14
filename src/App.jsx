import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import RequireAuth from './components/RequireAuth.jsx'
import AppLayout from './components/AppLayout.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Feeds from './pages/Feeds.jsx'
import Connections from './pages/Connections.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Pathless layout routes: guard first, then wrap in NavBar / Footer. */}
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/feeds" element={<Feeds />} />
            <Route path="/connections" element={<Connections />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/feeds" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
