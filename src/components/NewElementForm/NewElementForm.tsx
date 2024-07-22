import { Input, Select, Option, FormControl, FormLabel, Grid } from '@mui/joy';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorMessage from '../../ui/ErrorMessage';
import { ElementForm, ElementFormValues, StatusOptionsEnum } from '../../types/newElementFormTypes';
import { useAppState } from '../../context/AppState';

export default function NewElementForm(): JSX.Element {
  const {
    state: { openModalAddEditElements },
  } = useAppState();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ElementFormValues>();

  return (
    <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
      <Grid xs={12} sm={6} sx={{ boxSizing: 'border-box', padding: 1 }}>
        <FormControl error={!!errors?.customerEmail}>
          <FormLabel htmlFor={ElementForm.CUSTOMER_EMAIL}>Customer Email</FormLabel>
          <Input
            id={ElementForm.CUSTOMER_EMAIL}
            type='email'
            disabled={openModalAddEditElements.isEdit}
            {...register(ElementForm.CUSTOMER_EMAIL)}
          />
          {!!errors?.customerEmail && <ErrorMessage error={errors.customerEmail} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ boxSizing: 'border-box', padding: 1 }}>
        <FormControl error={!!errors?.invoiceNumber}>
          <FormLabel htmlFor={ElementForm.INVOICE_NUMBER}>Invoice Number</FormLabel>
          <Input id={ElementForm.INVOICE_NUMBER} {...register(ElementForm.INVOICE_NUMBER)} startDecorator='INV ' />
          {!!errors?.invoiceNumber && <ErrorMessage error={errors.invoiceNumber} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ boxSizing: 'border-box', padding: 1 }}>
        <FormControl error={!!errors?.customerName}>
          <FormLabel htmlFor={ElementForm.CUSTOMER_NAME}>Customer Name</FormLabel>
          <Input id={ElementForm.CUSTOMER_NAME} {...register(ElementForm.CUSTOMER_NAME)} />
          {!!errors?.customerName && <ErrorMessage error={errors.customerName} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ boxSizing: 'border-box', padding: 1 }}>
        <FormControl error={!!errors?.status}>
          <FormLabel htmlFor={ElementForm.STATUS}>Status</FormLabel>
          <Controller
            name={ElementForm.STATUS}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select
                {...field}
                value={field.value}
                placeholder='Select option...'
                onChange={(_, value) => field.onChange(value)}
              >
                {Object.entries(StatusOptionsEnum).map(([key, value]) => (
                  <Option key={key} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            )}
          />
          {!!errors?.status && <ErrorMessage error={errors.status} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ boxSizing: 'border-box', padding: 1 }}>
        <FormControl error={!!errors?.customerInitial}>
          <FormLabel htmlFor={ElementForm.CUSTOMER_INITIAL}>Customer Initial</FormLabel>
          <Input id={ElementForm.CUSTOMER_INITIAL} {...register(ElementForm.CUSTOMER_INITIAL)} />
          {!!errors?.customerInitial && <ErrorMessage error={errors.customerInitial} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ boxSizing: 'border-box', padding: 1 }}>
        <FormControl error={!!errors?.date}>
          <FormLabel htmlFor={ElementForm.DATE}>Date</FormLabel>
          <Input id={ElementForm.DATE} type='date' {...register(ElementForm.DATE)} />
          {!!errors?.date && <ErrorMessage error={errors.date} />}
        </FormControl>
      </Grid>
    </Grid>
  );
}
