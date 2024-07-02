import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';

import Chip from '@mui/joy/Chip';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';

import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';

import Typography from '@mui/joy/Typography';

import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

import { rows } from './utils/data';
import RowMenu from '../RowMenu';
import Filters from '../Filters';
import { useState } from 'react';
import { stableSort, getComparator, Order } from './utils/helper';
import Pagination from '../Pagination';

export default function OrderTable(): JSX.Element {
  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<readonly string[]>([]);

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
        <FormControl sx={{ flex: 1 }} size='sm'>
          <FormLabel>Search for order</FormLabel>
          <Input size='sm' placeholder='Search' startDecorator={<SearchIcon />} />
        </FormControl>
        <Filters />
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
                  onChange={(event) => {
                    setSelected(event.target.checked ? rows.map((row) => row.id) : []);
                  }}
                  color={selected.length > 0 || selected.length === rows.length ? 'primary' : undefined}
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline='none'
                  color='primary'
                  component='button'
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
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
            {stableSort(rows, getComparator(order, 'id')).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size='sm'
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? 'primary' : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked ? ids.concat(row.id) : ids.filter((itemId) => itemId !== row.id),
                      );
                    }}
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
                  <Chip
                    variant='soft'
                    size='sm'
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: 'success',
                        Refunded: 'neutral',
                        Cancelled: 'danger',
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
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
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Link level='body-xs' component='button'>
                      Download
                    </Link>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Pagination />
    </>
  );
}
