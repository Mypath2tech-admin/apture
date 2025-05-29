export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: "PENDING" | "ACTIVE" | "INACTIVE";
  joinDate: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  inviteToken?: string;
}

export interface CreateVolunteerData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  organizationId: string;
}

export interface UpdateVolunteerData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: "PENDING" | "ACTIVE" | "INACTIVE";
}

export interface VolunteerSignupData {
  name: string;
  email: string;
  phone: string;
  address: string;
  token: string;
}

export interface VolunteerInviteData {
  organizationId: string;
  baseUrl: string;
}
