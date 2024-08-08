import { Grid, FormControl, FormLabel, Input, Typography } from '@mui/joy'
import ErrorMessage from '../../ui/ErrorMessage'
import { useFormContext } from 'react-hook-form'
import { InvoiceFields } from '../../types/invoiceFormTypes'

export default function InvoiceSellerBuyer(): JSX.Element {
  const { SELLER_COMPANY_NAME, SELLER_ADDRESS, SELLER_NIP, BUYER_COMPANY_NAME, BUYER_ADDRESS, BUYER_NIP } =
    InvoiceFields

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Grid container spacing={2} sx={{ width: '100%', marginTop: 2 }}>
        <Grid xs={12} sm={6} sx={{ boxSizing: 'border-box', padding: 1 }}>
          <Typography level='h4'>Seller</Typography>

          <FormControl error={!!errors[SELLER_COMPANY_NAME]}>
            <FormLabel htmlFor={SELLER_COMPANY_NAME}>Company Name</FormLabel>
            <Input size='sm' id={SELLER_COMPANY_NAME} {...register(SELLER_COMPANY_NAME)} />
            {!!errors[SELLER_COMPANY_NAME] && <ErrorMessage error={errors[SELLER_COMPANY_NAME]} />}
          </FormControl>

          <FormControl error={!!errors[SELLER_NIP]} sx={{ marginTop: 2 }}>
            <FormLabel htmlFor={SELLER_NIP}>NIP</FormLabel>
            <Input size='sm' id={SELLER_NIP} {...register(SELLER_NIP)} />
            {!!errors[SELLER_NIP] && <ErrorMessage error={errors[SELLER_NIP]} />}
          </FormControl>

          <FormControl error={!!errors[SELLER_ADDRESS]} sx={{ marginTop: 2 }}>
            <FormLabel htmlFor={SELLER_ADDRESS}>Address</FormLabel>
            <Input size='sm' id={SELLER_ADDRESS} {...register(SELLER_ADDRESS)} />
            {!!errors[SELLER_ADDRESS] && <ErrorMessage error={errors[SELLER_ADDRESS]} />}
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6} sx={{ padding: 1 }}>
          <Typography level='h4'>Buyer</Typography>

          <FormControl error={!!errors[BUYER_COMPANY_NAME]}>
            <FormLabel htmlFor={BUYER_COMPANY_NAME}>Company name</FormLabel>
            <Input size='sm' id={BUYER_COMPANY_NAME} {...register(BUYER_COMPANY_NAME)} />
            {!!errors[BUYER_COMPANY_NAME] && <ErrorMessage error={errors[BUYER_COMPANY_NAME]} />}
          </FormControl>

          <FormControl error={!!errors[BUYER_NIP]} sx={{ marginTop: 2 }}>
            <FormLabel htmlFor={BUYER_NIP}>NIP</FormLabel>
            <Input size='sm' id={BUYER_NIP} {...register(BUYER_NIP)} />
            {!!errors[BUYER_NIP] && <ErrorMessage error={errors[BUYER_NIP]} />}
          </FormControl>

          <FormControl error={!!errors[BUYER_ADDRESS]} sx={{ marginTop: 2 }}>
            <FormLabel htmlFor={BUYER_ADDRESS}>Address</FormLabel>
            <Input size='sm' id={BUYER_ADDRESS} {...register(BUYER_ADDRESS)} />
            {!!errors[BUYER_ADDRESS] && <ErrorMessage error={errors[BUYER_ADDRESS]} />}
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}
