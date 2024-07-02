import { FormControl, FormLabel, Select, Option } from '@mui/joy';
import { optionsStatus, optionsCategory, optionsCustomer } from './utils/helpers';

export default function Filters(): JSX.Element {
  return (
    <>
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
