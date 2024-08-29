import CssBaseline from '@mui/joy/CssBaseline'
import Box from '@mui/joy/Box'
import OrderTable from '../../components/OrderTable/OrderTable'
import Header from '../../ui/Header'
import OrdersBelt from '../../components/OrdersBelt'
import AddEditElementsModal from '../../ui/AddEditElementsModal'
import DeletedModal from '../../ui/DeletedModal'
import Sidebar from '../../ui/Sidebar'
import InvoiceModal from '../../ui/InvoiceModal'

export default function OrdersPage(): JSX.Element {
  return (
    <>
      <CssBaseline />

      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component='main'
          className='MainContent'
          sx={{
            px: { xs: 2, md: 4 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
            },
            mr: 3,
            ml: 3,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            gap: 1,
          }}
        >
          <AddEditElementsModal />
          <DeletedModal />
          <InvoiceModal />

          <OrdersBelt />
          <OrderTable />
        </Box>
      </Box>
    </>
  )
}
