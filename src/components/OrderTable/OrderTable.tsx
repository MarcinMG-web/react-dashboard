import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForever from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { DataRow, rows } from './utils/data';
import RowMenu from '../RowMenu';
import TableFilters from '../TableFilters';
import { ChangeEvent, useEffect, useState } from 'react';
import { Order } from './utils/helper';
import Pagination from '../Pagination';
import ChipColor from '../ChipColor';
import { Status } from '../ChipColor/ChipColor';
import { Button, Stack } from '@mui/joy';
import { useAppState } from '../../context/AppState';

import useRealTimeData from '../../hooks/useRealTimeData';

export default function OrderTable(): JSX.Element {
  const { dispatch } = useAppState();

  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<string[]>([]);

  const { rowsData, rowsDataLoading } = useRealTimeData();

  useEffect(() => {
    if (rowsDataLoading) {
      // To Do: For skeleton
      dispatch({ type: 'SET_LOADING', payload: true });
    }
  }, [dispatch, rowsDataLoading]);

  const setSelectedCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? rows.map((row) => row.id) : []);
  };

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>, row: DataRow) => {
    setSelected((ids) => (event.target.checked ? [...ids, row.id] : ids.filter((itemId) => itemId !== row.id)));
  };

  const setOrderInvoice = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const onClickEditElement = (id: string) => {
    dispatch({ type: 'SET_SELECTED_ID', payload: id });
    dispatch({ type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS', payload: { modal: true, isEdit: true } });
  };

  const onClickRemovedElement = (id: string) => {
    dispatch({ type: 'SET_SELECTED_ID', payload: id });
    dispatch({ type: 'SET_OPEN_DELETED_MODAL', payload: true });
  };

  return (
    <>
      <Box
        className='SearchAndFilters-tabletUp'
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'flex', sm: 'flex' },
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
          display: { xs: 'initial', sm: 'initial' },
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
              <th style={{ width: 180, padding: '12px 6px' }}>Customer</th>
              <th style={{ width: 90, padding: '12px 6px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rowsData.map((row: DataRow, index: number) => (
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
                  <Typography level='body-xs'>{`INV-${index + 1}`}</Typography>
                </td>
                <td>
                  <Typography level='body-xs'>{row?.date}</Typography>
                </td>
                <td>
                  <ChipColor status={row?.status as Status} />
                </td>
                <td>
                  <Stack sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                    <Avatar size='sm'>{row?.customer?.initial}</Avatar>
                    <div>
                      <Typography level='body-md' color='success'>
                        {row?.customer?.name}
                      </Typography>
                      <Typography level='body-xs'>{row?.customer?.email}</Typography>
                    </div>
                  </Stack>
                </td>
                <td>
                  <Stack sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                    <Button color='neutral' variant='plain' size='md' onClick={() => onClickEditElement(row?.id)}>
                      <EditIcon
                        sx={{
                          color: 'var(--joy-palette-warning-500, #9A5B13)',
                        }}
                      />
                    </Button>

                    <Button color='danger' variant='plain' size='md' onClick={() => onClickRemovedElement(row?.id)}>
                      <DeleteForever
                        sx={{
                          color: 'var(--joy-palette-danger-700, #7D1212)',
                        }}
                      />
                    </Button>

                    <RowMenu />
                  </Stack>
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
