import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataRow, rows } from './utils/data';
import RowMenu from '../RowMenu';
import TableFilters from '../ TableFilters';
import { ChangeEvent, useState } from 'react';
import { Order } from './utils/helper';
import Pagination from '../Pagination';
import ChipColor from '../ChipColor';
import { Status } from '../ChipColor/ChipColor';
import { Button } from '@mui/joy';

export default function OrderTable(): JSX.Element {
  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const setSelectedCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? rows.map((row) => row.id) : []);
  };

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>, row: DataRow) => {
    setSelected((ids) => (event.target.checked ? [...ids, row.id] : ids.filter((itemId) => itemId !== row.id)));
  };

  const setOrderInvoice = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <Box
        className='SearchAndFilters-tabletUp'
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <TableFilters />
      </Box>
      <Sheet
        className='OrderTableContainer'
        variant='outlined'
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby='tableTitle'
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size='sm'
                  indeterminate={selected.length > 0 && selected.length !== rows.length}
                  checked={selected.length === rows.length}
                  onChange={(event) => setSelectedCheckBox(event)}
                  color={selected.length > 0 || selected.length === rows.length ? 'primary' : undefined}
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
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
                      transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
              <th style={{ width: 140, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size='sm'
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? 'primary' : undefined}
                    onChange={(event) => handleCheckBoxChange(event, row)}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level='body-xs'>{row.id}</Typography>
                </td>
                <td>
                  <Typography level='body-xs'>{row.date}</Typography>
                </td>
                <td>
                  <ChipColor status={row.status as Status} />
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size='sm'>{row.customer.initial}</Avatar>
                    <div>
                      <Typography level='body-xs'>{row.customer.name}</Typography>
                      <Typography level='body-xs'>{row.customer.email}</Typography>
                    </div>
                  </Box>
                </td>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Button color='neutral' variant='plain' size='md'>
                    <EditIcon color='warning' />
                  </Button>

                  <Button color='danger' variant='plain' size='md'>
                    <DeleteIcon color='error' />
                  </Button>

                  <RowMenu />
                </Box>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Pagination />
    </>
  );
}
