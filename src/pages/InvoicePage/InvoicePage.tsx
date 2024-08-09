import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/CssBaseline'
import Header from '../../ui/Header'
import Sidebar from '../../ui/Sidebar'
import { FormProvider, useForm } from 'react-hook-form'
import NewInvoiceForm from '../../components/NewInvoiceForm'
import Invoice from '../../components/Invoice'
import { defaultInvoiceValues } from '../../types/invoiceFormTypes'
import { useRef } from 'react'

export default function InvoicePage(): JSX.Element {
  const methods = useForm({ defaultValues: defaultInvoiceValues })
  const componentRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <CssBaseline />
      <Box display='flex' justifyContent='space-between' width='100%'>
        <FormProvider {...methods}>
          <Box width='45%' ref={componentRef}>
            <Invoice />
          </Box>

          <Box width='55%'>
            <Header />
            <Sidebar />
            <NewInvoiceForm componentRef={componentRef} />
          </Box>
        </FormProvider>
      </Box>
    </>
  )
}
