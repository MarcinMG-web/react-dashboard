import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/CssBaseline'
import Header from '../../ui/Header'
import Sidebar from '../../ui/Sidebar'
import { FormProvider, useForm } from 'react-hook-form'
import NewInvoiceForm from '../../components/NewInvoiceForm'
import Invoice from '../../components/Invoice'
import { InvoiceFormValues, defaultInvoiceValues } from '../../types/invoiceFormTypes'
import { useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { invoiceSchema } from '../../schema/invoiceSchema'

export default function InvoicePage(): JSX.Element {
  const methods = useForm<InvoiceFormValues>({
    defaultValues: defaultInvoiceValues,
    resolver: yupResolver(invoiceSchema),
  })
  const componentRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <CssBaseline />
      <Sidebar />

      <Box display='flex' flexDirection={{ xs: 'column', sm: 'row' }} justifyContent='space-between' width='100%'>
        <FormProvider {...methods}>
          <Box width={{ xs: '100%', sm: '45%' }} order={{ xs: 2, sm: 1 }} ref={componentRef}>
            <Invoice />
          </Box>

          <Box width={{ xs: '100%', sm: '55%' }} order={{ xs: 1, sm: 2 }}>
            <Header />
            <NewInvoiceForm componentRef={componentRef} />
          </Box>
        </FormProvider>
      </Box>
    </>
  )
}
