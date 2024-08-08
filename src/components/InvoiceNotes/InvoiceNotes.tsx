import { Grid, FormControl, FormLabel, Textarea } from '@mui/joy'
import ErrorMessage from '../../ui/ErrorMessage'
import { useFormContext } from 'react-hook-form'
import { InvoiceFields } from '../../types/invoiceFormTypes'

export default function InvoiceNotes(): JSX.Element {
  const { NOTES } = InvoiceFields

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Grid sx={{ width: '98%', marginTop: 2 }}>
      <FormControl error={!!errors[NOTES]}>
        <FormLabel htmlFor={NOTES}>Notes</FormLabel>
        <Textarea id={NOTES} {...register(NOTES)} sx={{ height: '15vh' }} />
        {!!errors[InvoiceFields.NOTES] && <ErrorMessage error={errors[InvoiceFields.NOTES]} />}
      </FormControl>
    </Grid>
  )
}
