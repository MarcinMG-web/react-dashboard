import dayjs from 'dayjs'
import { ElementFormValues } from '../../types/newElementFormTypes'
import { formatDateBE } from './formatDateBE'

export type ExpectedAPIFormat = {
  id: string
  created: string
  invoice: {
    number: string
    date: string
    status: string
  }
  customer: {
    initial: string
    name: string
    email: string
  }
}

export const dataPayloadNewElement = (data: ElementFormValues): ExpectedAPIFormat => {
  const { invoiceNumber, date, status, customerName, customerEmail, customerInitial } = data

  const expectedAPIFormat = {
    id: customerEmail,
    created: dayjs().format(),
    invoice: {
      number: invoiceNumber,
      date: formatDateBE(date),
      status: status,
    },
    customer: {
      initial: customerInitial,
      name: customerName,
      email: customerEmail,
    },
  }

  return expectedAPIFormat
}
