import { enqueueSnackbar } from 'notistack';
import { DataRow } from '../../OrderTable/utils/data';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export const generateCSV = (rowsData: DataRow[]): void => {
  dayjs.extend(localizedFormat);
  const date = dayjs().format('LLLL');

  const csv = `${generateSummary(rowsData)}\n\n${convertArrayToCSV(rowsData)}`;

  // Name file
  downloadCSV(csv, `Orders-${date}`);
  enqueueSnackbar('Success download .csv file!', { variant: 'success' });
};

export const convertArrayToCSV = (array: DataRow[]): string => {
  // Main content
  const header = 'Orders\nId,Date,Name,Email,Status\n';
  const rows = array
    .map(({ date, customer, status }, index) => `INV-${index + 1},${date},${customer.name},${customer.email},${status}`)
    .join('\n');
  return header + rows;
};

export const generateSummary = (array: DataRow[]): string => {
  // Summary
  const summary = array.reduce(
    (acc, invoice) => {
      if (!acc[invoice.status]) {
        acc[invoice.status] = 1;
      } else {
        acc[invoice.status]++;
      }
      return acc;
    },
    {} as { [key: string]: number },
  );

  const summaryRows = Object.entries(summary)
    .map(([status, count]) => `${status}: ${count}`)
    .join(', ');

  return `Summary\n${summaryRows}`;
};

export const downloadCSV = (csv: string, filename: string): void => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
