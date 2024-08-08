import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/CssBaseline'
import Header from '../../ui/Header'
import Sidebar from '../../ui/Sidebar'
import { FormProvider, useForm } from 'react-hook-form'
import NewInvoiceForm from '../../components/NewInvoiceForm'
import Invoice from '../../components/Invoice'
import { defaultInvoiceValues } from '../../types/invoiceFormTypes'
import { useRef } from 'react'
import { generatePDF } from './utils/generateInvoicePDF'
import { Button } from '@mui/joy'
import { enqueueSnackbar } from 'notistack'

export default function InvoicePage(): JSX.Element {
  const methods = useForm({ defaultValues: defaultInvoiceValues })
  const componentRef = useRef<HTMLDivElement>(null)

  const handlePrintClick = () => {
    generatePDF(componentRef)
    enqueueSnackbar('Success download .pdf file!', { variant: 'success' })
  }

  return (
    <>
      <CssBaseline />

      <Box display='flex' justifyContent='space-between' width='100%' height='100%'>
        <FormProvider {...methods}>
          <Box width='45%' ref={componentRef}>
            <Invoice />
          </Box>

          <Box width='55%'>
            <Header />
            <Sidebar />
            <NewInvoiceForm />
          </Box>
        </FormProvider>
      </Box>
      <Button color='success' onClick={handlePrintClick} sx={{ width: '45%' }}>
        Download Invoice
      </Button>
    </>
  )
}
