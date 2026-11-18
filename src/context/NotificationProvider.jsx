import { useCallback, useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import NotificationContext from './notificationContext.js'

function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })

  // Keep `notify` and the context value stable, so consumers don't re-render on every open/close.
  const notify = useCallback((message, severity = 'success') => {
    setNotification({ open: true, message, severity })
  }, [])
  const value = useMemo(() => ({ notify }), [notify])

  const handleClose = (event, reason) => {
    // A click elsewhere on the page shouldn't dismiss the message early.
    if (reason !== 'clickaway') {
      setNotification((current) => ({ ...current, open: false }))
    }
  }

  return (
    <NotificationContext value={value}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={notification.severity} variant="filled" onClose={handleClose}>
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext>
  )
}

export default NotificationProvider
