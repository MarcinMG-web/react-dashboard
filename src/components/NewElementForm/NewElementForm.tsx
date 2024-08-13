import { Input, Select, Option, FormControl, FormLabel, Grid } from '@mui/joy'
import { Controller, useFormContext } from 'react-hook-form'
import ErrorMessage from '../../ui/ErrorMessage'
import { ElementForm, ElementFormValues, StatusOptionsEnum } from '../../types/newElementFormTypes'
import { useAppState } from '../../context/AppState'

export default function NewElementForm(): JSX.Element {
  const {
    state: { openModalAddEditElements },
  } = useAppState()

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ElementFormValues>()

  const { CUSTOMER_EMAIL, INVOICE_NUMBER, CUSTOMER_NAME, STATUS, CUSTOMER_INITIAL, DATE } = ElementForm

  return (
    <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
      <Grid xs={12} sm={6} sx={{ padding: 1 }}>
        <FormControl error={!!errors?.[CUSTOMER_EMAIL]}>
          <FormLabel htmlFor={CUSTOMER_EMAIL}>Customer Email</FormLabel>
          <Input
            id={CUSTOMER_EMAIL}
            type='email'
            disabled={openModalAddEditElements.isEdit}
            {...register(CUSTOMER_EMAIL)}
          />
          {!!errors?.[CUSTOMER_EMAIL] && <ErrorMessage error={errors[CUSTOMER_EMAIL]} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ padding: 1 }}>
        <FormControl error={!!errors?.[INVOICE_NUMBER]}>
          <FormLabel htmlFor={INVOICE_NUMBER}>Invoice Number</FormLabel>
          <Input id={INVOICE_NUMBER} {...register(INVOICE_NUMBER)} startDecorator='INV ' />
          {!!errors?.[INVOICE_NUMBER] && <ErrorMessage error={errors[INVOICE_NUMBER]} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ padding: 1 }}>
        <FormControl error={!!errors?.[CUSTOMER_NAME]}>
          <FormLabel htmlFor={CUSTOMER_NAME}>Customer Name</FormLabel>
          <Input id={CUSTOMER_NAME} {...register(CUSTOMER_NAME)} />
          {!!errors?.[CUSTOMER_NAME] && <ErrorMessage error={errors[CUSTOMER_NAME]} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ padding: 1 }}>
        <FormControl error={!!errors?.[STATUS]}>
          <FormLabel htmlFor={STATUS}>Status</FormLabel>
          <Controller
            name={STATUS}
            control={control}
            defaultValue={StatusOptionsEnum.PENDING}
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
          {!!errors?.[STATUS] && <ErrorMessage error={errors[STATUS]} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ padding: 1 }}>
        <FormControl error={!!errors?.[CUSTOMER_INITIAL]}>
          <FormLabel htmlFor={CUSTOMER_INITIAL}>Customer Initial</FormLabel>
          <Input id={CUSTOMER_INITIAL} {...register(CUSTOMER_INITIAL)} />
          {!!errors?.[CUSTOMER_INITIAL] && <ErrorMessage error={errors[CUSTOMER_INITIAL]} />}
        </FormControl>
      </Grid>

      <Grid xs={12} sm={6} sx={{ padding: 1 }}>
        <FormControl error={!!errors?.[DATE]}>
          <FormLabel htmlFor={DATE}>Date</FormLabel>
          <Input id={DATE} type='date' {...register(DATE)} />
          {!!errors?.[DATE] && <ErrorMessage error={errors[DATE]} />}
        </FormControl>
      </Grid>
    </Grid>
  )
}
