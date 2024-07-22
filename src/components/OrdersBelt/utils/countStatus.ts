import { DataRow } from '../../OrderTable/utils/data'

export const countStatus = (data: DataRow[]) => {
  return data.reduce((acc: { [key: string]: number }, { invoice }) => {
    acc[invoice.status] = (acc[invoice.status] || 0) + 1
    return acc
  }, {})
}
