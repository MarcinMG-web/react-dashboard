import { ElementFormValues } from '../../types/newElementFormTypes';
import { formatDateBE } from './formatDateBE';

export type ExpectedAPIFormat = {
  id?: string;
  date: string;
  status: string;
  customer: {
    initial: string;
    name: string;
    email: string;
  };
};

export const dataPayloadNewElement = (data: ElementFormValues): ExpectedAPIFormat => {
  const { date, status, customerName, customerEmail, customerInitial } = data;

  const expectedAPIFormat = {
    date: formatDateBE(date),
    status: status,
    customer: {
      initial: customerInitial,
      name: customerName,
      email: customerEmail,
    },
  };

  return expectedAPIFormat;
};
