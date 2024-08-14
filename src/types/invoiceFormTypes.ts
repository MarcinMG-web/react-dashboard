export type InvoiceFormValues = {
  [InvoiceFields.Rows]: Row[]
  [InvoiceFields.PLACE]: string
  [InvoiceFields.INVOICE_DATE]: string
  [InvoiceFields.DUE_DATE]: string
  [InvoiceFields.SELLER_COMPANY_NAME]: string
  [InvoiceFields.SELLER_NIP]: string
  [InvoiceFields.SELLER_ADDRESS]: string
  [InvoiceFields.BUYER_COMPANY_NAME]: string
  [InvoiceFields.BUYER_NIP]: string
  [InvoiceFields.BUYER_ADDRESS]: string
  [InvoiceFields.NAME]: string
  [InvoiceFields.INVOICE_NUMBER]: string
  [InvoiceFields.NOTES]?: string | null
  [InvoiceFields.PAYMENT_METHOD]: string
  [InvoiceFields.DEADLINE_OF_PAYMENT]: string
  [InvoiceFields.WITHIN]: string
  [InvoiceFields.BANK_ACCOUNT_NUMBER]?: string
}

export enum InvoiceFields {
  Rows = 'rows',
  PLACE = 'place',
  INVOICE_DATE = 'invoiceDate',
  DUE_DATE = 'dueDate',
  SELLER_COMPANY_NAME = 'sellerCompanyName',
  SELLER_NIP = 'sellerNip',
  SELLER_ADDRESS = 'sellerAddress',
  BUYER_COMPANY_NAME = 'buyerCompanyName',
  BUYER_NIP = 'buyerNip',
  BUYER_ADDRESS = 'buyerAddress',
  NAME = 'name',
  INVOICE_NUMBER = 'invoiceNumber',
  NOTES = 'notes',
  PAYMENT_METHOD = 'paymentMethod',
  WITHIN = 'within',
  DEADLINE_OF_PAYMENT = 'deadlineOfPayment',
  BANK_ACCOUNT_NUMBER = 'bankAccountNumber',
}

export type Row = {
  [RowFields.ID]: number
  [RowFields.NAME]: string
  [RowFields.QUANTITY]: number
  [RowFields.NET_PRICE]: number
  [RowFields.VAT_RATE]: number
}

export enum RowFields {
  ID = 'id',
  NAME = 'name',
  QUANTITY = 'quantity',
  NET_PRICE = 'netPrice',
  VAT_RATE = 'vatRate',
}

export const defaultInvoiceValues: InvoiceFormValues = {
  [InvoiceFields.Rows]: [],
  [InvoiceFields.PLACE]: '',
  [InvoiceFields.INVOICE_DATE]: '',
  [InvoiceFields.DUE_DATE]: '',
  [InvoiceFields.SELLER_COMPANY_NAME]: '',
  [InvoiceFields.SELLER_NIP]: '',
  [InvoiceFields.SELLER_ADDRESS]: '',
  [InvoiceFields.BUYER_COMPANY_NAME]: '',
  [InvoiceFields.BUYER_NIP]: '',
  [InvoiceFields.BUYER_ADDRESS]: '',
  [InvoiceFields.NAME]: '',
  [InvoiceFields.INVOICE_NUMBER]: '',
  [InvoiceFields.NOTES]: '',
  [InvoiceFields.PAYMENT_METHOD]: '',
  [InvoiceFields.DEADLINE_OF_PAYMENT]: '',
  [InvoiceFields.WITHIN]: '',
  [InvoiceFields.BANK_ACCOUNT_NUMBER]: '',
}

export enum PaymentOptionsEnum {
  DUE_TRANSFER = 'Due Transfer',
  CASH = 'Cash',
}
