import { Button, Grid, Table, Input, Box, FormControl } from '@mui/joy'
import { useFieldArray, Controller, useFormContext } from 'react-hook-form'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import AddIcon from '@mui/icons-material/Add'
import NoData from '../../ui/NoData'

import { calculateValues } from './utils/calculateValues'
import { InvoiceFields, InvoiceFormValues, RowFields } from '../../types/invoiceFormTypes'
import ErrorMessage from '../../ui/ErrorMessage'

export default function InvoicesListed(): JSX.Element {
  const { Rows } = InvoiceFields
  const { NAME, QUANTITY, NET_PRICE, VAT_RATE } = RowFields

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<InvoiceFormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: Rows,
  })

  const addRow = () => {
    append({
      id: fields.length + 1,
      name: '',
      quantity: 0,
      netPrice: 0,
      vatRate: 23,
    })
  }

  const removeRow = (index: number) => remove(index)

  const watchedRows = watch(Rows)

  return (
    <Grid container spacing={2} sx={{ width: '98%', marginTop: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '10px' }}>
        <Button color='success' onClick={addRow}>
          <AddIcon />
        </Button>
      </Box>

      <Table borderAxis='xBetween'>
        <thead>
          <tr>
            <th style={{ width: '4%' }}>ID</th>
            <th style={{ width: '20%' }}>Name</th>
            <th>Quantity</th>
            <th>Net Price</th>
            <th>Net Value</th>
            <th>VAT Rate</th>
            <th>VAT Amount</th>
            <th>Gross Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fields.length > 0 ? (
            fields.map((field, index) => {
              const { netValue, vatAmount, grossValue } = calculateValues(watchedRows[index])

              const nameError = errors?.[Rows]?.[index]?.[NAME]
              const quantityError = errors?.[Rows]?.[index]?.[QUANTITY]
              const netPriceError = errors?.[Rows]?.[index]?.[NET_PRICE]
              const vatRateError = errors?.[Rows]?.[index]?.[VAT_RATE]

              return (
                <tr key={field.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Controller
                      name={`${Rows}.${index}.${NAME}`}
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!nameError}>
                          <Input {...field} />
                          {nameError && <ErrorMessage error={nameError} errorInArray='10px' />}
                        </FormControl>
                      )}
                    />
                  </td>
                  <td>
                    <Controller
                      name={`${Rows}.${index}.${QUANTITY}`}
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!quantityError}>
                          <Input {...field} sx={{ width: '6ch' }} />
                          {quantityError && <ErrorMessage error={quantityError} errorInArray='10px' />}
                        </FormControl>
                      )}
                    />
                  </td>
                  <td>
                    <Controller
                      name={`${Rows}.${index}.${NET_PRICE}`}
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!netPriceError}>
                          <Input {...field} sx={{ width: '8ch' }} />
                          {netPriceError && <ErrorMessage error={netPriceError} errorInArray='10px' />}
                        </FormControl>
                      )}
                    />
                  </td>
                  <td>{netValue}</td>
                  <td>
                    <Controller
                      name={`${Rows}.${index}.${VAT_RATE}`}
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!vatRateError}>
                          <Input {...field} sx={{ width: '6ch' }} />
                          {vatRateError && <ErrorMessage error={vatRateError} errorInArray='10px' />}
                        </FormControl>
                      )}
                    />
                  </td>
                  <td>{vatAmount}</td>
                  <td>{grossValue}</td>
                  <td>
                    <Button color='danger' variant='plain' onClick={() => removeRow(index)}>
                      <DeleteForeverTwoToneIcon />
                    </Button>
                  </td>
                </tr>
              )
            })
          ) : (
            <NoData colSpan={8} />
          )}
        </tbody>
      </Table>
    </Grid>
  )
}
