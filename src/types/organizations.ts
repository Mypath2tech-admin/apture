export interface OrganizationUser {
  canViewOrgDashboard?: boolean
  id?: string
  email: string
  firstName?: string
  lastName?: string
  role: "ADMIN" | "ORGANIZATION_ADMIN" | "ORGANIZATION_MEMBER" | "USER"
  organizationId?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  organization?:UserOrg
}
export interface UserOrg{
  id:string
  logo:string
  name:string
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

export interface UpdateUserRoleRequest {
  userId: string
  role: "ORGANIZATION_ADMIN" | "ORGANIZATION_MEMBER"
}

export interface RemoveUserRequest {
  userId: string
}

export interface UserActionResponse {
  success: boolean
  message: string
  error?: string
}
