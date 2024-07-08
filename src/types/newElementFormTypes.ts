export type ElementFormValues = {
  [ElementForm.CUSTOMER_NAME]: string;
  [ElementForm.CUSTOMER_EMAIL]: string;
  [ElementForm.DATE]: Date;
  [ElementForm.STATUS]: string;
  [ElementForm.CUSTOMER_INITIAL]: string;
};

export enum ElementForm {
  CUSTOMER_NAME = 'customerName',
  CUSTOMER_EMAIL = 'customerEmail',
  DATE = 'date',
  STATUS = 'status',
  CUSTOMER_INITIAL = 'customerInitial',
}

export enum StatusOptions {
  PENDING = 'Pending',
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  CANCELLED = 'Cancelled',
}
