import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import OrderTable from '../../components/OrderTable/OrderTable';
import PageLocator from '../../components/PageLocator';
import Header from '../../ui/Header';
import OrdersBelt from '../../components/OrdersBelt';
import AddEditElementsModal from '../../ui/AddEditElementsModal';
import { useAppState } from '../../context/AppState';

export default function MainApp(): JSX.Element {
  const {
    state: { openModalAddEditElements },
  } = useAppState();

  return (
    <div>
      <CssBaseline />

      <Header />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        {/* <Sidebar /> */}
        <Box
          component='main'
          className='MainContent'
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PageLocator />
          </Box>

          {openModalAddEditElements.modal && <AddEditElementsModal />}
          <OrdersBelt />
          <OrderTable />
        </Box>
      </Box>
    </div>
  );
}
