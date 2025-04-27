export interface OrganizationUser {
    id?: string
    email: string
    firstName?: string
    lastName?: string
    role: "ADMIN" | "ORGANIZATION_ADMIN" | "ORGANIZATION_MEMBER" | "USER"
    organizationId?: string
    isActive?: boolean
    createdAt?: string
    updatedAt?: string
  }
  
  export interface AddUserFormData {
    email: string
    firstName: string
    lastName: string
    role: "ORGANIZATION_ADMIN" | "ORGANIZATION_MEMBER"
    sendEmail: boolean
    message?: string
  }
  
  export interface AddUserResponse {
    success: boolean
    message: string
    user?: OrganizationUser
    error?: string
  }
  