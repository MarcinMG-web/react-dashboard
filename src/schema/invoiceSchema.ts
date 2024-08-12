import { InvoiceFields, RowFields } from '../types/invoiceFormTypes'
import * as Yup from 'yup'

export const invoiceSchema = Yup.object().shape({
  [InvoiceFields.Rows]: Yup.array()
    .of(
      Yup.object().shape({
        [RowFields.ID]: Yup.number().required('Product name is required'),
        [RowFields.NAME]: Yup.string().required('Quantity is required').min(1, 'Quantity must be at least 1'),
        [RowFields.QUANTITY]: Yup.number().required('Price is required').min(1, 'Price cannot be negative or 0'),
        [RowFields.NET_PRICE]: Yup.number().required('Net price is required').min(0, 'Net price cannot be negative'),
        [RowFields.VAT_RATE]: Yup.number()
          .required('VAT rate is required')
          .min(0, 'VAT rate cannot be negative')
          .max(100, 'VAT rate cannot exceed 100%'),
      }),
    )
    .required(),
  [InvoiceFields.PLACE]: Yup.string().required('Place is required'),
  [InvoiceFields.INVOICE_DATE]: Yup.string().required(),
  [InvoiceFields.DUE_DATE]: Yup.string()
    .required('Due date is required')
    .min(Yup.ref(InvoiceFields.INVOICE_DATE), 'Due date cannot be before the invoice date'),
  [InvoiceFields.SELLER_COMPANY_NAME]: Yup.string().required('Seller company name is required'),
  [InvoiceFields.SELLER_NIP]: Yup.string()
    .required('Seller NIP is required')
    .matches(/^\d{10}$/, 'Seller NIP must be 10 digits'),
  [InvoiceFields.SELLER_ADDRESS]: Yup.string().required('Seller address is required'),
  [InvoiceFields.BUYER_COMPANY_NAME]: Yup.string().required('Buyer company name is required'),
  [InvoiceFields.BUYER_NIP]: Yup.string()
    .required('Buyer NIP is required')
    .matches(/^\d{10}$/, 'Buyer NIP must be 10 digits'),
  [InvoiceFields.BUYER_ADDRESS]: Yup.string().required('Buyer address is required'),
  [InvoiceFields.NAME]: Yup.string().required('Name is required'),
  [InvoiceFields.INVOICE_NUMBER]: Yup.string().required('Invoice number is required'),
  [InvoiceFields.NOTES]: Yup.string().nullable(),
  [InvoiceFields.PAYMENT_METHOD]: Yup.string().required('Payment method is required'),
  [InvoiceFields.DEADLINE_OF_PAYMENT]: Yup.string().required('Deadline is required'),
  [InvoiceFields.WITHIN]: Yup.string().required('Within is required'),
  [InvoiceFields.BANK_ACCOUNT_NUMBER]: Yup.string()
    .required('Bank account number is required')
    .matches(/^\d{26}$/, 'Bank account number must be 26 digits'),
})
