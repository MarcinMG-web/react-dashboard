import { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Stack, Tooltip } from '@mui/joy';
import { useAppState } from '../../context/AppState';
import useRealTimeData from '../../hooks/useRealTimeData';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DataRow } from './utils/data';
import RowMenu from '../RowMenu';
import TableFilters from '../TableFilters';
import { Order } from './utils/helper';
import Pagination from '../Pagination';
import ChipColor from '../ChipColor';
import { Status } from '../ChipColor/ChipColor';

export default function OrderTable(): JSX.Element {
  const { dispatch } = useAppState();

  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useLocalStorage('selectedStars', []);

  const { rowsData, rowsDataLoading } = useRealTimeData();

  useEffect(() => {
    if (rowsDataLoading) {
      // To Do: For skeleton
      dispatch({ type: 'SET_LOADING', payload: true });
    }
  }, [dispatch, rowsDataLoading]);

  const setOrderInvoice = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const onClickEditElement = (id: DataRow['id']) => {
    dispatch({ type: 'SET_SELECTED_ID', payload: id });
    dispatch({ type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS', payload: { modal: true, isEdit: true } });
  };

  const onClickRemovedElement = (id: DataRow['id']) => {
    dispatch({ type: 'SET_SELECTED_ID', payload: id });
    dispatch({ type: 'SET_OPEN_DELETED_MODAL', payload: true });
  };

  const handleStarClick = (row: DataRow) => {
    if (selected.includes(row?.created)) {
      setSelected(selected.filter((el: string) => el !== row?.created));
    } else {
      setSelected([...selected, row?.created]);
    }
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
                      transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
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
          </thead>
          <tbody>
            {rowsData.map((row: DataRow, index: number) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 48 }}>
                  <Tooltip title='Select' color='warning' placement='top'>
                    <Stack
                      onClick={() => handleStarClick(row)}
                      style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                    >
                      {selected.includes(row?.created) ? <StarIcon color='warning' /> : <StarBorderIcon />}
                    </Stack>
                  </Tooltip>
                </td>
                <td>
                  <Typography level='body-xs'>{`INV-${index + 1}`}</Typography>
                </td>
                <td>
                  <Typography level='body-xs'>{row.date}</Typography>
                </td>
                <td>
                  <ChipColor status={row.status as Status} />
                </td>
                <td>
                  <Stack direction='row' alignItems='center'>
                    <Avatar size='sm'>{row.customer?.initial}</Avatar>
                    <div>
                      <Typography level='body-md' color='success'>
                        {row.customer?.name}
                      </Typography>
                      <Typography level='body-xs'>{row.customer?.email}</Typography>
                    </div>
                  </Stack>
                </td>
                <td>
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <Tooltip title='Edit' color='warning' placement='top-end'>
                      <Button color='warning' variant='plain' size='md' onClick={() => onClickEditElement(row.id)}>
                        <EditIcon color='warning' />
                      </Button>
                    </Tooltip>

                    <Tooltip title='Delete' color='danger' placement='top-end'>
                      <Button color='danger' variant='plain' size='md' onClick={() => onClickRemovedElement(row.id)}>
                        <DeleteForeverIcon
                          sx={{
                            color: 'var(--joy-palette-danger-700, #7D1212)',
                          }}
                        />
                      </Button>
                    </Tooltip>

                    <Tooltip title='Invoice' color='primary' placement='top-end'>
                      <Button color='primary' variant='plain' size='md'>
                        <DescriptionIcon />
                      </Button>
                    </Tooltip>

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
