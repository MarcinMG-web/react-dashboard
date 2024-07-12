import * as yup from 'yup';
import { ElementForm } from '../types/newElementFormTypes';

export const newElementSchema = yup.object().shape({
  [ElementForm.CUSTOMER_NAME]: yup.string().required('Customer Name is required'),
  [ElementForm.CUSTOMER_EMAIL]: yup.string().email('Invalid email format').required('Customer Email is required'),
  [ElementForm.DATE]: yup.string().required('Date is required').typeError('Invalid date format'),
  [ElementForm.STATUS]: yup.string().required('Status is required'),
  [ElementForm.CUSTOMER_INITIAL]: yup.string().required('Customer Initial is required'),
});
