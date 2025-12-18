import { getWeek, startOfMonth } from 'date-fns'

export interface PlanYearContext {
  calendarYear: number
  calendarMonth: number
  calendarWeek: number
  planYear: number
  planMonth: number
  planWeek: number
}

/**
 * Map a calendar date to the corresponding plan year/month/week
 * This converts calendar dates (e.g., 2025-01-15) to plan structure (Year 1, Year 2, Year 3)
 */
export function mapCalendarToPlanYear(
  calendarDate: Date,
  planStartDate: Date
): PlanYearContext {
  // Calculate which plan year we're in
  const msInYear = 365.25 * 24 * 60 * 60 * 1000
  const timeDiff = calendarDate.getTime() - planStartDate.getTime()
  const yearsDiff = Math.floor(timeDiff / msInYear)
  
  const planYear = Math.max(1, yearsDiff + 1) // Year 1, Year 2, Year 3, etc.
  
  // Calculate week number within the month
  const monthStart = startOfMonth(calendarDate)
  const weekNumber = getWeek(calendarDate, { weekStartsOn: 1 }) - getWeek(monthStart, { weekStartsOn: 1 }) + 1
  
  return {
    calendarYear: calendarDate.getFullYear(),
    calendarMonth: calendarDate.getMonth() + 1,
    calendarWeek: Math.max(1, weekNumber),
    planYear,
    planMonth: calendarDate.getMonth() + 1, // Same as calendar month
    planWeek: Math.max(1, weekNumber),       // Same as calendar week
  }
}

/**
 * Get month name from number (1-12)
 */
export function getMonthName(month: number): string {
  return new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })
}

