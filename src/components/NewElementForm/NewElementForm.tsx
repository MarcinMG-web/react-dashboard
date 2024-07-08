import { Input, Select, Option, Stack, FormControl, FormLabel } from '@mui/joy';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorMessage from '../../ui/ErrorMessage';
import { ElementForm, ElementFormValues } from '../../types/newElementFormTypes';

export default function NewElementForm(): JSX.Element {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ElementFormValues>();

  return (
    <Stack spacing={2}>
      <FormControl error={!!errors?.customerName}>
        <FormLabel htmlFor='customerName'>Customer Name</FormLabel>
        <Input id='customerName' {...register(ElementForm.CUSTOMER_NAME)} />
        {!!errors?.customerName && <ErrorMessage error={errors.customerName} />}
      </FormControl>

      <FormControl error={!!errors?.customerEmail}>
        <FormLabel htmlFor={ElementForm.CUSTOMER_EMAIL}>Customer Email</FormLabel>
        <Input id={ElementForm.CUSTOMER_EMAIL} type='email' {...register(ElementForm.CUSTOMER_EMAIL)} />
        {!!errors?.customerEmail && <ErrorMessage error={errors.customerEmail} />}
      </FormControl>

      <FormControl error={!!errors?.date}>
        <FormLabel htmlFor={ElementForm.DATE}>Date</FormLabel>
        <Input id={ElementForm.DATE} type={ElementForm.DATE} {...register(ElementForm.DATE)} />
        {!!errors?.date && <ErrorMessage error={errors.date} />}
      </FormControl>

      <FormControl error={!!errors?.status}>
        <FormLabel htmlFor={ElementForm.STATUS}>Status</FormLabel>
        <Controller
          name={ElementForm.STATUS}
          control={control}
          render={({ field }) => (
            <Select {...field} value={field.value || ''} onChange={(_, value) => field.onChange(value)}>
              <Option value='Pending'>Pending</Option>
              <Option value='Paid'>Paid</Option>
              <Option value='Refunded'>Refunded</Option>
            </Select>
          )}
        />
        {!!errors?.status && <ErrorMessage error={errors.status} />}
      </FormControl>

      <FormControl error={!!errors?.customerInitial}>
        <FormLabel htmlFor={ElementForm.CUSTOMER_INITIAL}>Customer Initial</FormLabel>
        <Input id={ElementForm.CUSTOMER_INITIAL} {...register(ElementForm.CUSTOMER_INITIAL)} />
        {!!errors?.customerInitial && <ErrorMessage error={errors.customerInitial} />}
      </FormControl>
    </Stack>
  );
}
