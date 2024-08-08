import { Box } from '@mui/joy'
import InvoiceHeader from '../InvoiceHeader'
import InvoiceSellerBuyer from '../InvoiceSellerBuyer'
import InvoiceNotes from '../InvoiceNotes'
import InvoicesListed from '../InvoicesListed'
import InvoicePaymentAndPreferences from '../InvoicePaymentAndPreferences'

export default function NewInvoiceForm(): JSX.Element {
  return (
    <>
      <Box sx={{ padding: '10px' }}>
        {/** Date */}
        <InvoiceHeader />
        {/** Seller / Buyer */}
        <InvoiceSellerBuyer />
        {/** Main */}
        <InvoicesListed />
        {/** Payment and preferences */}
        <InvoicePaymentAndPreferences />
        {/** Notes */}
        <InvoiceNotes />
      </Box>
    </>
  )
}
