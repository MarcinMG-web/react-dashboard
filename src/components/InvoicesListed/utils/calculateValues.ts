import { Row } from '../../../types/invoiceFormTypes'

export const calculateValues = (rows: Row) => {
  const VAT = rows.vatRate / 100
  const netValue = rows.quantity * rows.netPrice
  const vatAmount = netValue * VAT
  const grossValue = netValue + vatAmount

  return {
    netValue: netValue.toFixed(2),
    vatAmount: vatAmount.toFixed(2),
    grossValue: grossValue.toFixed(2),
  }
}

export const calculateTotals = (rows: Row[]) => {
  const totalGrossValue = rows.reduce((total, row) => {
    const { grossValue } = calculateValues(row)
    return total + parseFloat(grossValue)
  }, 0)

  return totalGrossValue.toFixed(2)
}
