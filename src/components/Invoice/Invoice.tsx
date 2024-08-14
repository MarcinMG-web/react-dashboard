import { useFormContext } from 'react-hook-form'
import { Box, Divider, Stack, Table, Typography } from '@mui/joy'
import NoData from '../../ui/NoData'
import { calculateTotals, calculateValues } from '../InvoicesListed/utils/calculateValues'
import { InvoiceFields, PaymentOptionsEnum, Row } from '../../types/invoiceFormTypes'

export default function Invoice(): JSX.Element {
  const { watch } = useFormContext()

  const watchedRows: Row[] = watch(InvoiceFields.Rows)

  const place = watch(InvoiceFields.PLACE)
  const invoiceDate = watch(InvoiceFields.INVOICE_DATE)
  const dueDate = watch(InvoiceFields.DUE_DATE)
  const sellerCompanyName = watch(InvoiceFields.SELLER_COMPANY_NAME)
  const sellerNip = watch(InvoiceFields.SELLER_NIP)
  const sellerAddress = watch(InvoiceFields.SELLER_ADDRESS)
  const buyerCompanyName = watch(InvoiceFields.BUYER_COMPANY_NAME)
  const buyerNip = watch(InvoiceFields.BUYER_NIP)
  const buyerAddress = watch(InvoiceFields.BUYER_ADDRESS)
  const name = watch(InvoiceFields.NAME)
  const total = calculateTotals(watchedRows)
  const invoiceNumber = watch(InvoiceFields.INVOICE_NUMBER)
  const paymentMethod = watch(InvoiceFields.PAYMENT_METHOD)
  const within = watch(InvoiceFields.WITHIN)
  const deadlineOfPayment = watch(InvoiceFields.DEADLINE_OF_PAYMENT)
  const bankAccountNumber = watch(InvoiceFields.BANK_ACCOUNT_NUMBER)
  const notes = watch(InvoiceFields.NOTES)

  const isBank = watch(InvoiceFields.PAYMENT_METHOD) === PaymentOptionsEnum.DUE_TRANSFER

  const addSpacesEveryFourChars = (value: string): string => value.replace(/(.{4})/g, '$1 ')

  return (
    <Box
      sx={{
        height: '90vh',
        margin: '25px',
        padding: '20px',
      }}
    >
      <Stack spacing={2}>
        <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
          <Stack spacing={0}>
            <Typography level='h1'>Invoice</Typography>
          </Stack>
          <Stack spacing={1} alignItems='flex-start'>
            <Typography>Place: {place}</Typography>
            <Typography>Invoice Date: {invoiceDate}</Typography>
            <Typography>Due Date: {dueDate}</Typography>
          </Stack>
        </Stack>

        <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
          <Stack spacing={1} alignItems='flex-start'>
            <Typography level='h3'>Seller</Typography>
            <Typography>Company Name: {sellerCompanyName}</Typography>
            <Typography>NIP: {sellerNip}</Typography>
            <Typography>Address: {sellerAddress}</Typography>
          </Stack>

          <Stack spacing={1} alignItems='flex-end'>
            <Typography level='h3'>Buyer</Typography>
            <Typography>Company Name: {buyerCompanyName}</Typography>
            <Typography>NIP: {buyerNip}</Typography>
            <Typography>Address: {buyerAddress}</Typography>
          </Stack>
        </Stack>

        <Stack alignItems='center'>
          <Typography level='h3'>
            Invoice {name} {invoiceNumber}
          </Typography>
        </Stack>

        <Box sx={{ marginTop: '5vh' }}>
          <Table borderAxis='xBetween'>
            <thead>
              <tr style={{ fontWeight: '100' }}>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Net Price</th>
                <th>Net Value</th>
                <th>VAT Rate</th>
                <th>VAT Amount</th>
                <th>Gross Value</th>
              </tr>
            </thead>
            <tbody>
              {watchedRows.length > 0 ? (
                watchedRows.map((row: Row, index: number) => {
                  const { netValue, vatAmount, grossValue } = calculateValues(row)
                  return (
                    <tr key={row?.id} style={{ fontWeight: '500' }}>
                      <td>{index + 1}</td>
                      <td>{row?.name}</td>
                      <td>{row?.quantity}</td>
                      <td>{row?.netPrice}</td>
                      <td>{netValue}</td>
                      <td>{row?.vatRate}</td>
                      <td>{vatAmount}</td>
                      <td>{grossValue}</td>
                    </tr>
                  )
                })
              ) : (
                <NoData colSpan={8} />
              )}
            </tbody>
          </Table>
        </Box>

        <Divider />

        <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
          <Stack spacing={1} alignItems='flex-start'>
            <Typography>Payment method: {paymentMethod}</Typography>
            <Typography>Within: {within}</Typography>
            <Typography>Deadline of payment: {deadlineOfPayment}</Typography>

            {isBank ? (
              <Typography>
                Bank account number:
                <br />
                <b>{addSpacesEveryFourChars(bankAccountNumber)}</b>
              </Typography>
            ) : null}
          </Stack>

          <Stack spacing={1} alignItems='flex-end'>
            <Typography level='h4'>Total to pay: {total} PLN</Typography>
          </Stack>
        </Stack>

        <Stack alignItems='center'>
          <Typography sx={{ marginTop: '20px' }} level='body-sm'>
            {notes}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
