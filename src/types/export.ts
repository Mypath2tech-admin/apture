export interface ExportRequestParams {
    startDate?: string
    endDate?: string
    categoryId?: string
    budgetId?: string
    format: "csv" | "excel" | "pdf"
    includeReceipts?: boolean
  }
  
  export interface ExportResponse {
    success: boolean
    url?: string
    error?: string
  }
  