import { FormControl, FormLabel, Grid, Input, Select, Option } from '@mui/joy'
import { Controller, useFormContext } from 'react-hook-form'
import { InvoiceFields, PaymentOptionsEnum } from '../../types/invoiceFormTypes'
import ErrorMessage from '../../ui/ErrorMessage'

export default function InvoicePaymentAndPreferences(): JSX.Element {
  const { PAYMENT_METHOD, WITHIN, DEADLINE_OF_PAYMENT, BANK_ACCOUNT_NUMBER } = InvoiceFields

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Grid sx={{ width: '98%', marginTop: 2 }}>
      <FormControl error={!!errors[PAYMENT_METHOD]}>
        <FormLabel htmlFor={PAYMENT_METHOD}>Payment method</FormLabel>
        <Controller
          name={PAYMENT_METHOD}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              value={field.value}
              placeholder='Select option...'
              onChange={(_, value) => field.onChange(value)}
            >
              {Object.entries(PaymentOptionsEnum).map(([key, value]) => (
                <Option key={key} value={value}>
                  {value}
                </Option>
              ))}
            </Select>
          )}
        />
        {!!errors?.status && <ErrorMessage error={errors.status} />}
      </FormControl>
      <FormControl error={!!errors[WITHIN]} sx={{ marginTop: 2 }}>
        <FormLabel htmlFor={WITHIN}>Within</FormLabel>
        <Input size='sm' id={WITHIN} sx={{ width: '50%' }} startDecorator=' WITHIN ' {...register(WITHIN)} />
        {!!errors[WITHIN] && <ErrorMessage error={errors[WITHIN]} />}
      </FormControl>
      <FormControl error={!!errors[DEADLINE_OF_PAYMENT]} sx={{ marginTop: 2 }}>
        <FormLabel htmlFor={DEADLINE_OF_PAYMENT}>Deadline</FormLabel>
        <Input
          size='sm'
          id={DEADLINE_OF_PAYMENT}
          type='date'
          sx={{ width: '50%' }}
          {...register(DEADLINE_OF_PAYMENT)}
        />
        {!!errors[DEADLINE_OF_PAYMENT] && <ErrorMessage error={errors[DEADLINE_OF_PAYMENT]} />}
      </FormControl>
      <FormControl error={!!errors[BANK_ACCOUNT_NUMBER]} sx={{ marginTop: 2 }}>
        <FormLabel htmlFor={BANK_ACCOUNT_NUMBER}>Bank account number</FormLabel>
        <Input
          size='sm'
          id={BANK_ACCOUNT_NUMBER}
          startDecorator='Bank account number '
          {...register(BANK_ACCOUNT_NUMBER)}
        />
        {!!errors[BANK_ACCOUNT_NUMBER] && <ErrorMessage error={errors[BANK_ACCOUNT_NUMBER]} />}
      </FormControl>
    </Grid>
  )
}
