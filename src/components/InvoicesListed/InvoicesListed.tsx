import { Button, Grid, Table, Input, Box } from '@mui/joy'
import { useFieldArray, Controller, useFormContext } from 'react-hook-form'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import AddIcon from '@mui/icons-material/Add'
import NoData from '../../ui/NoData'

import { calculateValues } from './utils/calculateValues'
import { InvoiceFields, RowFields } from '../../types/invoiceFormTypes'

export default function InvoicesListed(): JSX.Element {
  const { Rows } = InvoiceFields
  const { NAME, QUANTITY, NET_PRICE, VAT_RATE } = RowFields

  const { control, watch } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: Rows,
  })

  const addRow = () => {
    append({
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

              return (
                <tr key={field.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Controller
                      name={`${Rows}.${index}.${NAME}`}
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                  </td>
                  <td>
                    <Controller
                      name={`${Rows}.${index}.${QUANTITY}`}
                      control={control}
                      render={({ field }) => <Input {...field} sx={{ width: '6ch' }} />}
                    />
                  </td>
                  <td>
                    <Controller
                      name={`${Rows}.${index}.${NET_PRICE}`}
                      control={control}
                      render={({ field }) => <Input {...field} sx={{ width: '8ch' }} />}
                    />
                  </td>
                  <td>{netValue}</td>
                  <td>
                    <Controller
                      name={`${Rows}.${index}.${VAT_RATE}`}
                      control={control}
                      render={({ field }) => <Input {...field} sx={{ width: '6ch' }} />}
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
