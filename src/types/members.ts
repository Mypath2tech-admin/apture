export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: "active" | "inactive" | "pending";
  membershipType: string;
  duesAmount: number;
  lastPaymentDate: string;
  dueStatus: "paid" | "overdue" | "pending";
  notes: string;
}

export interface MemberFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  membershipType: string;
  agreeToTerms: boolean;
}

export interface MembershipType {
  id: string;
  name: string;
  monthlyFee: number;
  description: string;
}

export interface PaymentHistory {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  method: string;
  status: "completed" | "pending" | "failed";
  type: "monthly-dues" | "one-time" | "registration-fee";
  notes?: string;
}

export interface PaymentInfo {
  memberId: string;
  amount: number;
  type: string;
}

export interface MemberFilters {
  search?: string;
  status?: "active" | "inactive" | "pending" | "all";
  dueStatus?: "paid" | "overdue" | "pending" | "all";
  membershipType?: string;
  joinDateStart?: string;
  joinDateEnd?: string;
}

export interface MemberStats {
  totalMembers: number;
  activeMembers: number;
  pendingMembers: number;
  inactiveMembers: number;
  totalMonthlyDues: number;
  overduePayments: number;
  membershipTypeBreakdown: {
    type: string;
    count: number;
  }[];
}
