import { format, isValid } from 'date-fns'

export const formatDate = (date, dateFormat = 'MM/dd/yyyy') => {
  const currentDate = new Date(date)

  if (!isValid(currentDate)) {
    return ''
  }

  return format(currentDate, dateFormat)
}
