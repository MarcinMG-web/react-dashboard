import { State } from '../../../context/Interface';
import { StatusOptionsEnum } from '../../../types/newElementFormTypes';
import { DataRow } from './data';

export const search = (
  dataRow: DataRow[],
  queryText: State['queryText'],
  selectedStatus: State['selectedStatus'],
  selectedCustomer: State['selectedCustomer'],
) => {
  const { PAID, PENDING, REFUNDED, CANCELLED } = StatusOptionsEnum;

  const normalizedQuery = queryText.toLowerCase().trim();
  const normalizedCustomerName = selectedCustomer.toLowerCase().trim();

  const matchesQuery = (value?: string) => {
    return value ? value.toLowerCase().includes(normalizedQuery) : false;
  };

  const matchesCustomerName = (value?: string) => {
    return value ? value.toLowerCase().includes(normalizedCustomerName) : false;
  };

  return dataRow.filter((row) => {
    // Check if any query condition is met
    const matchesSearch =
      matchesQuery(row.customer.name) ||
      matchesQuery(row.customer.email) ||
      matchesQuery(row.customer.initial) ||
      matchesQuery(row.date) ||
      matchesQuery(row.status);

    // Check if the client name matches
    const matchesCustomer = matchesCustomerName(row.customer.name);

    // Filtering by selected status
    switch (selectedStatus) {
      case PAID:
        return matchesSearch && matchesCustomer && row.status === PAID;
      case PENDING:
        return matchesSearch && matchesCustomer && row.status === PENDING;
      case REFUNDED:
        return matchesSearch && matchesCustomer && row.status === REFUNDED;
      case CANCELLED:
        return matchesSearch && matchesCustomer && row.status === CANCELLED;
      default:
        return matchesSearch && matchesCustomer;
    }
  });
};
