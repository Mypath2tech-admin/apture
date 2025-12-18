import { getWeek, startOfMonth } from 'date-fns'

/**
 * Extract year, month, and week number from a date
 */
export function extractYearMonthWeek(date: Date | string): {
  year: number
  month: number
  week: number
} {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1 // 1-12
  
  // Calculate week number within the month (1-4 or 1-5)
  const monthStart = startOfMonth(dateObj)
  const weekNumber = getWeek(dateObj, { weekStartsOn: 1 }) - getWeek(monthStart, { weekStartsOn: 1 }) + 1
  
  return {
    year,
    month,
    week: Math.max(1, weekNumber), // Ensure at least week 1
  }
}

/**
 * Get week number within a month (1-5)
 */
export function getWeekNumberInMonth(date: Date): number {
  const monthStart = startOfMonth(date)
  const weekNumber = getWeek(date, { weekStartsOn: 1 }) - getWeek(monthStart, { weekStartsOn: 1 }) + 1
  return Math.max(1, weekNumber)
}

