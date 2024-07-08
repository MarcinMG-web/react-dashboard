import { FormControl, FormLabel, Select, Option, Input } from '@mui/joy';
import { optionsStatus, optionsCategory, optionsCustomer } from './utils/helpers';
import SearchIcon from '@mui/icons-material/Search';

export default function TableFilters(): JSX.Element {
  return (
    <>
      <FormControl sx={{ flex: 1 }} size='sm'>
        <FormLabel>Search for order</FormLabel>
        <Input size='sm' placeholder='Search' startDecorator={<SearchIcon />} />
      </FormControl>

      <FormControl size='sm'>
        <FormLabel>Status</FormLabel>
        <Select size='sm' placeholder='Filter by status' slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}>
          {optionsStatus.map(({ value, description }) => (
            <Option key={value} value={value}>
              {description}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl size='sm'>
        <FormLabel>Category</FormLabel>
        <Select size='sm' placeholder='All'>
          {optionsCategory.map(({ value, description }) => (
            <Option key={value} value={value}>
              {description}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl size='sm'>
        <FormLabel>Customer</FormLabel>
        <Select size='sm' placeholder='All'>
          {optionsCustomer.map(({ value, description }) => (
            <Option key={value} value={value}>
              {description}
            </Option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
