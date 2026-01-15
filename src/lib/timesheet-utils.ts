import { getWeek, startOfMonth, getDaysInMonth as dateFnsGetDaysInMonth, format } from 'date-fns'

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

// ============================================
// Monthly Timesheet Utilities
// ============================================

export interface MonthDay {
  dayOfMonth: number
  date: Date
  dayName: string
  formattedDate: string
}

export interface MonthWeek {
  weekNumber: number // 1-4
  label: string // "Week 1 (Days 1-7)"
  days: MonthDay[]
}

export interface MonthStructure {
  year: number
  month: number
  monthName: string
  weeks: MonthWeek[]
  extraDays: MonthDay[]
  totalDays: number
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(year: number, month: number): number {
  return dateFnsGetDaysInMonth(new Date(year, month - 1))
}

/**
 * Get the day name for a date
 */
function getDayName(date: Date): string {
  return format(date, 'EEEE')
}

/**
 * Get the month name
 */
export function getMonthNameFromNumber(month: number): string {
  const date = new Date(2000, month - 1, 1)
  return format(date, 'MMMM')
}

/**
 * Get month structure with 4 weeks (days 1-28) and extra days (29-31)
 * Week 1: Days 1-7
 * Week 2: Days 8-14
 * Week 3: Days 15-21
 * Week 4: Days 22-28
 * Extra: Days 29-31 (if applicable)
 */
export function getMonthStructure(year: number, month: number): MonthStructure {
  const totalDays = getDaysInMonth(year, month)
  const monthName = getMonthNameFromNumber(month)
  
  const weeks: MonthWeek[] = []
  const extraDays: MonthDay[] = []
  
  // Create weeks 1-4 (days 1-28)
  for (let weekNum = 1; weekNum <= 4; weekNum++) {
    const startDay = (weekNum - 1) * 7 + 1
    const endDay = weekNum * 7
    const days: MonthDay[] = []
    
    for (let day = startDay; day <= endDay; day++) {
      const date = new Date(year, month - 1, day)
      days.push({
        dayOfMonth: day,
        date,
        dayName: getDayName(date),
        formattedDate: format(date, 'MMM d, yyyy'),
      })
    }
    
    weeks.push({
      weekNumber: weekNum,
      label: `Week ${weekNum} (Days ${startDay}-${endDay})`,
      days,
    })
  }
  
  // Extra days (29, 30, 31 if they exist)
  for (let day = 29; day <= totalDays; day++) {
    const date = new Date(year, month - 1, day)
    extraDays.push({
      dayOfMonth: day,
      date,
      dayName: getDayName(date),
      formattedDate: format(date, 'MMM d, yyyy'),
    })
  }
  
  return {
    year,
    month,
    monthName,
    weeks,
    extraDays,
    totalDays,
  }
}

/**
 * Get array of years for selection (current year - 1 to current year + 1)
 */
export function getYearOptions(): number[] {
  const currentYear = new Date().getFullYear()
  return [currentYear - 1, currentYear, currentYear + 1]
}

/**
 * Get array of months for selection
 */
export function getMonthOptions(): { value: number; label: string }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: getMonthNameFromNumber(i + 1),
  }))
}

/**
 * Initialize empty monthly entries for a given year/month
 */
export function initializeMonthlyEntries(year: number, month: number): { dayOfMonth: number; duration: string }[] {
  const totalDays = getDaysInMonth(year, month)
  return Array.from({ length: totalDays }, (_, i) => ({
    dayOfMonth: i + 1,
    duration: '',
  }))
}

/**
 * Get the week number (1-4) for a given day of month, or 0 if it's an extra day
 */
export function getWeekForDay(dayOfMonth: number): number {
  if (dayOfMonth <= 7) return 1
  if (dayOfMonth <= 14) return 2
  if (dayOfMonth <= 21) return 3
  if (dayOfMonth <= 28) return 4
  return 0 // Extra day
}
