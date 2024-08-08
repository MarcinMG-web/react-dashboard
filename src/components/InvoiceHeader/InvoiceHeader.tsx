import { Grid, FormControl, FormLabel, Input } from '@mui/joy'

import ErrorMessage from '../../ui/ErrorMessage'
import { useFormContext } from 'react-hook-form'
import { InvoiceFields } from '../../types/invoiceFormTypes'

export default function InvoiceHeader(): JSX.Element {
  const { NAME, INVOICE_NUMBER, PLACE, INVOICE_DATE, DUE_DATE } = InvoiceFields

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid xs={12} sm={6} sx={{ padding: 1 }}>
        <FormControl error={!!errors[NAME]} sx={{ marginTop: 1 }}>
          <FormLabel htmlFor={NAME}>Name</FormLabel>
          <Input size='sm' id={NAME} {...register(NAME)} />
          {!!errors[NAME] && <ErrorMessage error={errors[NAME]} />}
        </FormControl>

        <FormControl error={!!errors[INVOICE_NUMBER]} sx={{ marginTop: 2 }}>
          <FormLabel htmlFor={INVOICE_NUMBER}>Invoice Number</FormLabel>
          <Input size='sm' id={INVOICE_NUMBER} startDecorator='Invoice ' {...register(INVOICE_NUMBER)} />
          {!!errors[INVOICE_NUMBER] && <ErrorMessage error={errors[INVOICE_NUMBER]} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ padding: 1 }}>
        <FormControl error={!!errors[PLACE]} sx={{ marginTop: 1 }}>
          <FormLabel htmlFor={PLACE}>Place</FormLabel>
          <Input size='sm' id={PLACE} {...register(PLACE)} />
          {!!errors[PLACE] && <ErrorMessage error={errors[PLACE]} />}
        </FormControl>

        <FormControl error={!!errors[INVOICE_DATE]} sx={{ marginTop: 2 }}>
          <FormLabel htmlFor={INVOICE_DATE}>Invoice Date</FormLabel>
          <Input size='sm' id={INVOICE_DATE} type='date' {...register(INVOICE_DATE)} />
          {!!errors[INVOICE_DATE] && <ErrorMessage error={errors[INVOICE_DATE]} />}
        </FormControl>

        <FormControl error={!!errors[DUE_DATE]} sx={{ marginTop: 2 }}>
          <FormLabel htmlFor={DUE_DATE}>Due Date</FormLabel>
          <Input size='sm' id={DUE_DATE} type='date' {...register(DUE_DATE)} />
          {!!errors[DUE_DATE] && <ErrorMessage error={errors[DUE_DATE]} />}
        </FormControl>
      </Grid>
    </Grid>
  )
}
