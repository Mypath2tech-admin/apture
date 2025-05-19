export interface TimesheetEntry {
    id?: string
    description: string
    startTime: string
    endTime: string
    duration: number
    timesheetId?: string
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
}

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
