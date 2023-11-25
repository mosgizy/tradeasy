export const nextWeekDate = () => {
    const currentDate = new Date()
    const dayOfWeek = currentDate.getDay()
    const daysUntilTargetDay = (dayOfWeek + 7 - currentDate.getDay()) % 7

    const nextWeekDate = new Date(currentDate)
    nextWeekDate.setDate(currentDate.getDate() + daysUntilTargetDay + 7)

    return nextWeekDate.toDateString()
}