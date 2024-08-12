export type ElementFormValues = {
  [ElementForm.CUSTOMER_NAME]: string
  [ElementForm.CUSTOMER_EMAIL]: string
  [ElementForm.DATE]: string
  [ElementForm.STATUS]: string
  [ElementForm.CUSTOMER_INITIAL]: string
  [ElementForm.INVOICE_NUMBER]: string
}

export enum ElementForm {
  CUSTOMER_NAME = 'customerName',
  CUSTOMER_EMAIL = 'customerEmail',
  DATE = 'date',
  STATUS = 'status',
  CUSTOMER_INITIAL = 'customerInitial',
  INVOICE_NUMBER = 'invoiceNumber',
}

export enum StatusOptionsEnum {
  PAID = 'Paid',
  PENDING = 'Pending',
  REFUNDED = 'Refunded',
  CANCELLED = 'Cancelled',
}

export const defaultElementFormValues: ElementFormValues = {
  [ElementForm.CUSTOMER_NAME]: '',
  [ElementForm.CUSTOMER_EMAIL]: '',
  [ElementForm.DATE]: '',
  [ElementForm.STATUS]: '',
  [ElementForm.CUSTOMER_INITIAL]: '',
  [ElementForm.INVOICE_NUMBER]: '',
}
