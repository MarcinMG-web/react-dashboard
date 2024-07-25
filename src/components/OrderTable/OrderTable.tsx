import Box from '@mui/joy/Box'
import Table from '@mui/joy/Table'
import { useMemo, useState } from 'react'
import { useAppState } from '../../context/AppState'
import useRealTimeData from '../../hooks/useRealTimeData'
import NoData from '../../ui/NoData'
import Pagination from '../Pagination'
import TableFilters from '../TableFilters'
import { search } from './utils/search'
import SkeletonBodyTable from '../../ui/SkeletonBodyTable'
import BodyTable from '../BodyTable/BodyTable'
import SkeletonHeadTable from '../../ui/SkeletonHeadTable'
import HeadTable from '../HeadTable'
import { Sheet } from '@mui/joy'

export default function OrderTable(): JSX.Element {
  const {
    state: { queryText, selectedStatus, selectedCustomer },
    dispatch,
  } = useAppState()
  const { rowsData, rowsDataLoading } = useRealTimeData()

  const [order, setOrder] = useState('descending')

  const setOrderInvoice = () => {
    setOrder(order === 'ascending' ? 'descending' : 'ascending')
    rowsData.reverse()
  }

  const [currentPage, setCurrentPage] = useState(1)

  // Filtered data
  const filteredRowsData = search(rowsData, queryText, selectedStatus, selectedCustomer)

  useMemo(() => {
    dispatch({ type: 'SET_DATA_WITH_FILTERS', payload: filteredRowsData })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsDataLoading, queryText, selectedStatus, selectedCustomer])

  const renderTableBody = () => {
    switch (true) {
      case rowsDataLoading:
        return <SkeletonBodyTable itemsPerPage={itemsPerPage} />

      case filteredRowsData.length > 0:
        return <BodyTable displayedRows={displayedRows} />

      default:
        return <NoData />
    }
  }

  // Pagination
  const itemsPerPage = 8
  const displayedRows = filteredRowsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const showPagination = rowsDataLoading || filteredRowsData.length > 0

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
            {rowsDataLoading ? <SkeletonHeadTable /> : <HeadTable setOrderInvoice={setOrderInvoice} order={order} />}
          </thead>

          <tbody>{renderTableBody()}</tbody>
        </Table>
      </Sheet>

      {showPagination && (
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />
      )}
    </>
  )
}
