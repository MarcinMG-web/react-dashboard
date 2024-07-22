import { ElementForm, ElementFormValues } from '../../types/newElementFormTypes';
import { ExpectedAPIFormat } from './dataPayloadNewElement';

export const expectedElementFormValues = (data: ExpectedAPIFormat): ElementFormValues => {
  const { invoice, customer } = data;
  const { name, email, initial } = customer;
  const { number, status, date } = invoice;

  const expectedFrontendData = {
    [ElementForm.CUSTOMER_NAME]: name,
    [ElementForm.CUSTOMER_EMAIL]: email,
    [ElementForm.CUSTOMER_INITIAL]: initial,
    [ElementForm.INVOICE_NUMBER]: number,
    [ElementForm.STATUS]: status,
    [ElementForm.DATE]: date,
  };

  return expectedFrontendData;
};
