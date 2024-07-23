import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Link from '@mui/joy/Link'
import { DataRow } from '../OrderTable/utils/data'

interface HeadTableProps {
  rowsData: DataRow[]
}

export default function HeadTable({ rowsData }: HeadTableProps): JSX.Element {
  const [order, setOrder] = useState('descending')

  const setOrderInvoice = () => {
    setOrder(order === 'ascending' ? 'descending' : 'ascending')
    rowsData.reverse()
  }

  return (
    <tr>
      <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>Stars</th>
      <th style={{ width: 120, padding: '12px 6px' }}>
        <Link
          underline='none'
          color='primary'
          component='button'
          onClick={setOrderInvoice}
          fontWeight='lg'
          endDecorator={<ArrowDropDownIcon />}
          sx={{
            '& svg': {
              transition: '0.2s',
              transform: order === 'descending' ? 'rotate(0deg)' : 'rotate(180deg)',
            },
          }}
        >
          Invoice
        </Link>
      </th>

      <th style={{ width: 140, padding: '10px 6px' }}>Date</th>
      <th style={{ width: 140, padding: '10px 6px' }}>Status</th>
      <th style={{ width: 140, padding: '10px 6px' }}>Customer</th>
      <th style={{ width: 160, padding: '10px 6px' }}>Action</th>
    </tr>
  )
}
