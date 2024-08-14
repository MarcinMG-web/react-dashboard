import { InvoiceFields } from '../../../types/invoiceFormTypes'

const {
  NAME,
  INVOICE_NUMBER,
  PLACE,
  INVOICE_DATE,
  DUE_DATE,
  SELLER_COMPANY_NAME,
  SELLER_ADDRESS,
  SELLER_NIP,
  BUYER_COMPANY_NAME,
  BUYER_ADDRESS,
  BUYER_NIP,
  PAYMENT_METHOD,
  WITHIN,
  DEADLINE_OF_PAYMENT,
  BANK_ACCOUNT_NUMBER,
} = InvoiceFields

const { Rows } = InvoiceFields

export const validationByStep = (activeStep: number) => {
  let fieldsToValidate: InvoiceFields[] = []

  switch (activeStep) {
    case 0:
      fieldsToValidate = [
        NAME,
        INVOICE_NUMBER,
        PLACE,
        INVOICE_DATE,
        DUE_DATE,
        SELLER_COMPANY_NAME,
        SELLER_ADDRESS,
        SELLER_NIP,
        BUYER_COMPANY_NAME,
        BUYER_ADDRESS,
        BUYER_NIP,
      ]
      break

    case 1:
      fieldsToValidate = [Rows]
      break

    case 2:
      fieldsToValidate = [PAYMENT_METHOD, WITHIN, DEADLINE_OF_PAYMENT, BANK_ACCOUNT_NUMBER]
      break

    default:
      break
  }

  return fieldsToValidate
}
