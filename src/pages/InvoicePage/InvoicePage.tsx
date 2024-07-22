import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Header from '../../ui/Header';
import Sidebar from '../../ui/Sidebar';

export default function InvoicePage(): JSX.Element {
  return (
    <>
      <CssBaseline />

      <Box display='flex' justifyContent='space-between' width='100%' height='100%'>
        <Box width='50%' height='97vh'>
          Visual INVOICE
        </Box>
        <Box width='50%' height='97vh'>
          <Header />
          <Sidebar />
          FORM
        </Box>
      </Box>
    </>
  );
}
