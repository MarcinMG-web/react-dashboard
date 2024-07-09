import { ElementForm, ElementFormValues } from '../../types/newElementFormTypes';
import { ExpectedAPIFormat } from './dataPayloadNewElement';

export const expectedElementFormValues = (data: ExpectedAPIFormat): ElementFormValues => {
  const { status, date, customer } = data;
  const { name, email, initial } = customer;

  const expectedFrontendData = {
    [ElementForm.CUSTOMER_NAME]: name,
    [ElementForm.CUSTOMER_EMAIL]: email,
    [ElementForm.DATE]: date,
    [ElementForm.STATUS]: status,
    [ElementForm.CUSTOMER_INITIAL]: initial,
  };

  return expectedFrontendData;
};
