import { prisma } from './prisma'
import { findYearPlanDocument, searchByYearMonthWeek } from './vector-search'
import { format, startOfMonth, endOfMonth } from 'date-fns'

export interface UserContext {
  yearPlan?: string
  timesheets?: string
  budgets?: string
  performance?: string
}

/**
 * Build comprehensive context for AI assistant
 */
export async function buildUserContext(
  userId: string,
  organizationId?: string | null
): Promise<UserContext> {
  const context: UserContext = {}

  // Get Year Plan context
  try {
    const yearPlanContext = await getYearPlanContext(userId, organizationId || undefined)
    if (yearPlanContext) {
      context.yearPlan = yearPlanContext
    }
  } catch (error) {
    console.error('Error fetching year plan context:', error)
  }

  // Get timesheet context (current month)
  try {
    const timesheetContext = await getTimesheetContext(userId, organizationId || undefined)
    if (timesheetContext) {
      context.timesheets = timesheetContext
    }
  } catch (error) {
    console.error('Error fetching timesheet context:', error)
  }

  // Get budget context (current month)
  try {
    const budgetContext = await getBudgetContext(userId, organizationId || undefined)
    if (budgetContext) {
      context.budgets = budgetContext
    }
  } catch (error) {
    console.error('Error fetching budget context:', error)
  }

  // Get performance context
  try {
    const performanceContext = await getPerformanceContext(userId, organizationId || undefined)
    if (performanceContext) {
      context.performance = performanceContext
    }
  } catch (error) {
    console.error('Error fetching performance context:', error)
  }

  return context
}

/**
 * Get Year Plan context summary
 */
async function getYearPlanContext(
  userId?: string,
  organizationId?: string
): Promise<string | null> {
  const yearPlan = await findYearPlanDocument(userId, organizationId)
  
  if (!yearPlan) {
    return null
  }

  // Get a general overview from the plan (first few chunks)
  const chunks = await searchByYearMonthWeek(yearPlan.id)
  
  if (chunks.length === 0) {
    return `3-Year Plan document "${yearPlan.name}" is available but contains no structured content.`
  }

  // Get summary of available years/months/weeks
  const years = new Set<number>()
  const months = new Set<number>()
  const weeks = new Set<number>()
  
  chunks.forEach(chunk => {
    if (chunk.year) years.add(chunk.year)
    if (chunk.month) months.add(chunk.month)
    if (chunk.week) weeks.add(chunk.week)
  })

  return `3-Year Plan document "${yearPlan.name}" is available with:
- Years: ${Array.from(years).sort().join(', ')}
- Months covered: ${months.size}
- Weeks covered: ${weeks.size}
The plan can be used to answer questions about planned activities, goals, and timelines.`
}

/**
 * Get timesheet context for current month
 */
async function getTimesheetContext(
  userId: string,
  organizationId?: string
): Promise<string | null> {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const where: {
    userId?: string
    organizationId?: string
    startDate: { gte: Date; lte: Date }
  } = {
    startDate: {
      gte: monthStart,
      lte: monthEnd,
    },
  }

  if (organizationId) {
    where.organizationId = organizationId
  } else {
    where.userId = userId
  }

  const timesheets = await prisma.timesheet.findMany({
    where,
    include: {
      entries: true,
    },
    orderBy: { startDate: 'desc' },
    take: 10, // Last 10 timesheets
  })

  if (timesheets.length === 0) {
    return null
  }

  const totalHours = timesheets.reduce((sum, ts) => {
    const hours = ts.entries.reduce((entrySum, entry) => entrySum + entry.duration, 0)
    return sum + hours
  }, 0)

  const totalEarnings = timesheets.reduce((sum, ts) => {
    const hours = ts.entries.reduce((entrySum, entry) => entrySum + entry.duration, 0)
    return sum + (hours * (ts.hourlyRate || 0))
  }, 0)

  return `Recent Timesheets (${format(monthStart, 'MMMM yyyy')}):
- Total timesheets: ${timesheets.length}
- Total hours logged: ${totalHours.toFixed(1)} hours
- Estimated earnings: $${totalEarnings.toFixed(2)}
- Latest timesheet: "${timesheets[0]?.name || 'N/A'}"`
}

/**
 * Get budget context for current month
 */
async function getBudgetContext(
  userId: string,
  organizationId?: string
): Promise<string | null> {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const where: {
    userId?: string
    organizationId?: string
    OR: Array<{
      startDate?: { lte: Date }
      endDate?: { gte: Date }
      endDate?: null
    }>
  } = {
    OR: [
      {
        startDate: { lte: monthEnd },
        endDate: { gte: monthStart },
      },
      {
        startDate: { lte: monthEnd },
        endDate: null,
      },
    ],
  }

  if (organizationId) {
    where.organizationId = organizationId
  } else {
    where.userId = userId
  }

  const budgets = await prisma.budget.findMany({
    where,
    include: {
      expenses: true,
    },
  })

  if (budgets.length === 0) {
    return null
  }

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0)
  const totalSpent = budgets.reduce((sum, budget) => {
    const spent = budget.expenses.reduce((expSum, exp) => expSum + exp.amount, 0)
    return sum + spent
  }, 0)
  const remaining = totalBudget - totalSpent
  const percentageUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  return `Budget Status (${format(monthStart, 'MMMM yyyy')}):
- Active budgets: ${budgets.length}
- Total budget: $${totalBudget.toFixed(2)}
- Total spent: $${totalSpent.toFixed(2)}
- Remaining: $${remaining.toFixed(2)}
- Usage: ${percentageUsed.toFixed(1)}%`
}

/**
 * Get performance context
 */
async function getPerformanceContext(
  userId: string,
  organizationId?: string
): Promise<string | null> {
  const now = new Date()
  const monthStart = startOfMonth(now)

  // Get timesheet performance
  const timesheetWhere: {
    userId?: string
    organizationId?: string
    startDate: { gte: Date }
  } = {
    startDate: { gte: monthStart },
  }

  if (organizationId) {
    timesheetWhere.organizationId = organizationId
  } else {
    timesheetWhere.userId = userId
  }

  const recentTimesheets = await prisma.timesheet.findMany({
    where: timesheetWhere,
    include: {
      entries: true,
    },
    orderBy: { startDate: 'desc' },
    take: 5,
  })

  if (recentTimesheets.length === 0) {
    return null
  }

  const avgHoursPerWeek = recentTimesheets.reduce((sum, ts) => {
    const hours = ts.entries.reduce((entrySum, entry) => entrySum + entry.duration, 0)
    return sum + hours
  }, 0) / recentTimesheets.length

  return `Performance Summary:
- Recent timesheets: ${recentTimesheets.length}
- Average hours per week: ${avgHoursPerWeek.toFixed(1)} hours
- Latest activity: ${format(recentTimesheets[0]?.startDate || new Date(), 'MMM d, yyyy')}`
}

/**
 * Format context for AI prompt
 */
export function formatContextForPrompt(context: UserContext): string {
  const parts: string[] = []

  if (context.yearPlan) {
    parts.push(`## 3-Year Plan\n${context.yearPlan}`)
  }

  if (context.timesheets) {
    parts.push(`## Timesheets\n${context.timesheets}`)
  }

  if (context.budgets) {
    parts.push(`## Budgets\n${context.budgets}`)
  }

  if (context.performance) {
    parts.push(`## Performance\n${context.performance}`)
  }

  if (parts.length === 0) {
    return ''
  }

  return `\n\n---\n\n**User Context:**\n\n${parts.join('\n\n')}\n\n---\n\n`
}

