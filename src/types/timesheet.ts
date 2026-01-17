export interface TimesheetEntry {
    id?: string
    description: string
    startTime: string
    endTime: string
    duration: number
    timesheetId?: string
}

export interface WeeklyDescriptions {
    week1: string
    week2: string
    week3: string
    week4: string
}

export interface Timesheet {
    hourlyRate: number
    id?: string
    name: string
    description?: string
    startDate: string
    endDate?: string
    // status: string
    userId?: string
    organizationId?: string
    entries: TimesheetEntry[]
    weeklyDescriptions?: WeeklyDescriptions
    targetUserId?: string // Optional: ID of user for whom timesheet is being created (for delegated creation)
}

export interface MonthlyDayEntry {
    dayOfMonth: number  // 1-31
    duration: string
}

export interface MonthlyTimesheetFormData {
    name: string
    year: number
    month: number  // 1-12
    hourlyRate: string
    weeklyDescriptions: WeeklyDescriptions
    // Days 1-28 are in weeks, days 29-31 are extra days
    entries: MonthlyDayEntry[]
}

// Keep legacy form data for backwards compatibility
export interface TimesheetFormData {
    name: string
    description: string
    weekStarting: string
    hourlyRate: string
    entries: {
        dayIndex: number
        duration: string
        description: string
    }[]
}

export interface TimesheetResponse {
    totalAmount:number
    hourlyRate:number
    subtotal: number | undefined
    _count?: {
        entries: number
    }
    id: string
    name: string
    description: string | null
    startDate: string
    endDate: string | null
    // status: string
    userId: string
    organizationId: string | null
    taxRate?: number
    taxAmount?: number
    entries: TimesheetEntry[]
    weeklyDescriptions?: WeeklyDescriptions | null
    user?: {
        id: string
        email: string
        firstName: string | null
        lastName: string | null
    }
}

export interface TimesheetListResponse {
    timesheets: TimesheetResponse[]
    pagination: {
        total: number
        pages: number
        page: number
        limit: number
    }
}
