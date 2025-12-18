import { prisma } from './prisma'
import { findYearPlanDocument } from './vector-search'
import { format, startOfMonth, endOfMonth } from 'date-fns'

export interface UserContext {
  yearPlan?: string
  timesheets?: string
  budgets?: string
  performance?: string
}

/**
 * Helper function to add timeout to promises
 */
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
  )
  return Promise.race([promise, timeout])
}

/**
 * Build comprehensive context for AI assistant
 * Optimized to run queries in parallel with timeouts to prevent blocking
 */
export async function buildUserContext(
  userId: string,
  organizationId?: string | null
): Promise<UserContext> {
  const context: UserContext = {}
  const timeoutMs = 5000 // 5 second timeout per query

  // Run all context queries in parallel for better performance
  // Each query has a 5s timeout to prevent blocking
  const [yearPlanContext, timesheetContext, budgetContext, performanceContext] = await Promise.allSettled([
    withTimeout(
      getYearPlanContext(userId, organizationId || undefined),
      timeoutMs,
      'Year plan context timeout'
    ),
    withTimeout(
      getTimesheetContext(userId, organizationId || undefined),
      timeoutMs,
      'Timesheet context timeout'
    ),
    withTimeout(
      getBudgetContext(userId, organizationId || undefined),
      timeoutMs,
      'Budget context timeout'
    ),
    withTimeout(
      getPerformanceContext(userId, organizationId || undefined),
      timeoutMs,
      'Performance context timeout'
    ),
  ])

  // Handle Year Plan context
  if (yearPlanContext.status === 'fulfilled' && yearPlanContext.value) {
    context.yearPlan = yearPlanContext.value
  } else if (yearPlanContext.status === 'rejected') {
    console.error('Error fetching year plan context:', yearPlanContext.reason)
  }

  // Handle Timesheet context
  if (timesheetContext.status === 'fulfilled' && timesheetContext.value) {
    context.timesheets = timesheetContext.value
  } else if (timesheetContext.status === 'rejected') {
    console.error('Error fetching timesheet context:', timesheetContext.reason)
  }

  // Handle Budget context
  if (budgetContext.status === 'fulfilled' && budgetContext.value) {
    context.budgets = budgetContext.value
  } else if (budgetContext.status === 'rejected') {
    console.error('Error fetching budget context:', budgetContext.reason)
  }

  // Handle Performance context
  if (performanceContext.status === 'fulfilled' && performanceContext.value) {
    context.performance = performanceContext.value
  } else if (performanceContext.status === 'rejected') {
    console.error('Error fetching performance context:', performanceContext.reason)
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

  // Get a general overview from the plan
  // Query chunks to get summary of available years/months/weeks
  // Use a more efficient query with limits
  const chunks = await prisma.documentEmbedding.findMany({
    where: {
      documentId: yearPlan.id,
      year: { not: null },
      month: { not: null },
      week: { not: null },
    },
    select: {
      year: true,
      month: true,
      week: true,
    },
    take: 200, // Reduced limit for faster queries - enough to get unique combinations
  })
  
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
      endDate?: { gte: Date } | null
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

