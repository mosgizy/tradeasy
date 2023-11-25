export const calculateTimeInterval = (dateString: string) => {
  const currentDate = new Date()
  const targetDate = new Date('2023-11-25T03:40:23.384Z')
  const timeDifference = targetDate.getTime() - currentDate.getTime()

  const seconds = Math.floor(Math.abs(timeDifference) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return {value: days, unit: 'days'}
  } else if (hours > 0) {
    return {value: hours, unit: 'hours'}
  } else if (minutes > 0) {
    return {value: minutes, unit: 'minutes'}
  } else {
    return {value: seconds, unit: 'seconds'}
  }
}