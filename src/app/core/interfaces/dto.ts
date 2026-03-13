export interface WalletChild {
  id: number;
  name: string;
}

export interface WalletResponse {
  id: number;
  name: string;
  currency: string;
  balance: number;
  children?: WalletChild[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WalletPayload {
  name: string;
  currency: string;
  balance: number;
  childrenIds?: number[];
}


export interface CategoryResponse {
  id: number;
  name: string;
}

export interface CategoryDetailResponse {
  categoryId: number;
  categoryName: string;
  budgetLimit: number;
  usedAmount: number;
  usedPercentage: number;
}


export interface BudgetResponse {
  id: number;
  categoryId: number;
  categoryName: string;
  monthlyLimit: number;
  createdAt: string;
}

export interface CreateBudgetPayload {
  categoryId: number;
  monthlyLimit: number;
}

export interface ChildResponse {
  id: number;
  name: string;
  email: string;
  status: string;
  spendingLimit: number;
  totalSpentThisMonth: number;
}

export interface CreateChildPayload {
  name: string;
  email: string;
  password: string;
  spendingLimit: number;
}

export interface TransactionResponse {
  id: number;
  type: string;
  amount: number;
  description: string;
  category: string;
  categoryName: string;
  wallet: string;
  walletName: string;
  date: string;
  createdAt: string;
}

export interface CreateTransactionPayload {
  walletId: number;
  categoryId?: number | null;
  amount: number;
  type: string;
  description?: string;
}

export interface ParentOverview {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  totalWallets: number;
  totalCategories: number;
  totalChildren: number;
}

export interface IncomeVsExpenseStat {
  month: string;
  income: number;
  expense: number;
}

export interface ChildSpendingStat {
  childName: string;
  totalSpent: number;
  spendingLimit: number;
}

export interface SpendingByCategoryStat {
  category: string;
  amount: number;
}

export interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface ChildOverview {
  walletBalance: number;
  spendingLimit: number;
  totalSpent: number;
  remainingLimit: number;
}

export interface ChildSpendingByCategory {
  category: string;
  amount: number;
}

export interface ChildWalletResponse {
  walletId: number;
  walletName: string;
  currency: string;
  balance: number;
}
