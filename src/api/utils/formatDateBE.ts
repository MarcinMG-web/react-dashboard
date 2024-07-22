import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDateBE = (dateString: string): string => {
  const date = dayjs(dateString)

  return date.format('YYYY-MM-DD')
}
