import { use } from 'react'
import NotificationContext from '../context/notificationContext.js'

// Returns `notify(message, severity)`; severity is 'success' (default), 'info', 'warning' or 'error'.
function useNotify() {
  return use(NotificationContext).notify
}

export default useNotify
