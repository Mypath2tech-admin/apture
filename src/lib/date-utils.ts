/**
 * Get the week number for a given date
 * @param date The date to get the week number for
 * @returns The week number (1-53)
 */
export function getWeekNumber(date: Date): number {
  // Copy date to avoid modifying the original
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))

  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))

  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)

  return weekNo
}

/**
 * Get the date of a specific week in a year
 * @param year The year
 * @param week The week number (1-53)
 * @returns The date of the Monday of that week
 */
export function getDateOfWeek(year: number, week: number): Date {
  // Create a date for January 1st of the given year
  const januaryFirst = new Date(year, 0, 1)

  // Get the day of the week for January 1st (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = januaryFirst.getDay()

  // Calculate days to add to get to the first Monday of the year
  const daysToFirstMonday = dayOfWeek === 1 ? 0 : (8 - dayOfWeek) % 7

  // Calculate the date of the first Monday of the year
  const firstMonday = new Date(year, 0, 1 + daysToFirstMonday)

  // Calculate the date of the Monday of the requested week
  const result = new Date(firstMonday)
  result.setDate(firstMonday.getDate() + (week - 1) * 7)

  return result
}
