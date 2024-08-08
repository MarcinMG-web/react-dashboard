import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/CssBaseline'
import Header from '../../ui/Header'
import Sidebar from '../../ui/Sidebar'
import { FormProvider, useForm } from 'react-hook-form'
import NewInvoiceForm from '../../components/NewInvoiceForm'
import Invoice from '../../components/Invoice'
import { defaultInvoiceValues } from '../../types/invoiceFormTypes'

export default function InvoicePage(): JSX.Element {
  const methods = useForm({ defaultValues: defaultInvoiceValues })

  // const { handleSubmit } = methods

  // const onSubmit = (data: any) => {
  //   console.log(data)
  // }

  return (
    <>
      <CssBaseline />

      <Box display='flex' justifyContent='space-between' width='100%' height='100%'>
        <FormProvider {...methods}>
          <Box width='45%'>
            <Invoice />
          </Box>

          <Box width='55%'>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <Header />
            <Sidebar />
            <NewInvoiceForm />
            {/* </form> */}
          </Box>
        </FormProvider>
      </Box>
    </>
  )
}
