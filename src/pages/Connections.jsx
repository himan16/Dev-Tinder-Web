import { useSearchParams } from 'react-router'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import ConnectionsList from '../components/ConnectionsList.jsx'
import RequestsList from '../components/RequestsList.jsx'
import useReceivedRequests from '../hooks/useReceivedRequests.js'

function Connections() {
  // The active tab lives in the URL (?tab=connections), so a refresh or a shared link keeps it.
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') === 'connections' ? 'connections' : 'requests'
  // Same query as the list below, so this adds no extra request.
  const { data: requests } = useReceivedRequests()

  return (
    <Container maxWidth="md">
      <Tabs
        value={tab}
        onChange={(event, value) => setSearchParams({ tab: value }, { replace: true })}
        sx={{ mb: 3 }}
      >
        <Tab
          value="requests"
          label={
            <Badge
              badgeContent={requests?.length}
              color="primary"
              sx={{ '& .MuiBadge-badge': { right: -14 } }}
            >
              Requests
            </Badge>
          }
        />
        <Tab value="connections" label="Connections" />
      </Tabs>
      <Box>{tab === 'requests' ? <RequestsList /> : <ConnectionsList />}</Box>
    </Container>
  )
}

export default Connections
