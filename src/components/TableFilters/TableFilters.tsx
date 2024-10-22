import SearchIcon from '@mui/icons-material/Search'
import { FormControl, FormLabel, Input, Option, Select, Skeleton } from '@mui/joy'
import { useAppState } from '../../context/AppState'
import useRealTimeData from '../../hooks/useRealTimeData'
import { StatusOptionsEnum } from '../../types/newElementFormTypes'

export default function TableFilters(): JSX.Element {
  const { rowsData, rowsDataLoading } = useRealTimeData()
  const {
    state: { queryText },
    dispatch,
  } = useAppState()

  const optionsCustomer = rowsData.map(({ customer }) => ({
    value: customer.name,
    description: customer.name,
  }))

  // Prepare customers with out repetition
  const customerOptionsWithoutRepetition = [...new Set(optionsCustomer.map((option) => JSON.stringify(option)))].map(
    (unique) => JSON.parse(unique),
  )

  return (
    <>
      <FormControl sx={{ flex: 1 }} size='sm'>
        <Skeleton variant='rectangular' width={610} height={30} loading={rowsDataLoading}>
          <FormLabel>Search for order</FormLabel>
          <Input
            size='sm'
            placeholder='Search'
            startDecorator={<SearchIcon />}
            value={queryText}
            onChange={(e) => dispatch({ type: 'SET_QUERY_TEXT', payload: e.target.value })}
          />
        </Skeleton>
      </FormControl>

      <FormControl size='sm'>
        <Skeleton variant='rectangular' width={200} height={30} loading={rowsDataLoading}>
          <FormLabel>Status</FormLabel>
          <Select
            size='sm'
            onChange={(_, value) => dispatch({ type: 'SET_SELECTED_STATUS', payload: value as string })}
            placeholder='Filter by status'
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            <Option value=''>All</Option>

            {Object.entries(StatusOptionsEnum).map(([key, value]) => (
              <Option key={key} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Skeleton>
      </FormControl>

      <FormControl size='sm'>
        <Skeleton variant='rectangular' width={200} height={30} loading={rowsDataLoading}>
          <FormLabel>Customer</FormLabel>
          <Select
            size='sm'
            placeholder='All'
            onChange={(_, value) => dispatch({ type: 'SET_SELECTED_CUSTOMER', payload: value as string })}
          >
            <Option value=''>All</Option>

            {customerOptionsWithoutRepetition.map(({ value, description }) => (
              <Option key={value} value={value}>
                {description}
              </Option>
            ))}
          </Select>
        </Skeleton>
      </FormControl>
    </>
  )
}
