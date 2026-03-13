//  Admin User DTOs 
export interface AdminUserResponse {
  id: number;
  name: string;
  email: string;
  user_role: string;
  user_status: string;
  numOfTransaction: number;
  date_joined: string;
}

//  Admin Dashboard DTOs 
export interface AdminDashboardOverview {
  totalUsers: number;
  activeParents: number;
  activeChildren: number;
  totalTransactionAmount: number;
}

export interface UserDistribution {
  parentCount: number;
  childCount: number;
}

export interface RecentUser {
  name: string;
  email: string;
  role: string;
  dateRegistered: string;
}

export interface UserRegistrationStat {
  year: number;
  month: number;
  registrations: number;
}

export interface TransactionVolumeStat {
  year: number;
  month: number;
  averageTransactionAmount: number;
}

//  Admin Transaction DTO 
export interface AdminTransactionResponse {
  transactionId: number;
  userName: string;
  transactionType: string;
  amount: number;
  category: string;
  date: string;
  userStatus: string;
}
