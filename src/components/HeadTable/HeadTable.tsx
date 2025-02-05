import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Link from '@mui/joy/Link'

interface HeadTableProps {
  setOrderInvoice: () => void
  order: string
}

export default function HeadTable({ setOrderInvoice, order }: HeadTableProps): JSX.Element {
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
      <th style={{ width: 120, padding: '10px 6px' }}>Action</th>
    </tr>
  )
}
