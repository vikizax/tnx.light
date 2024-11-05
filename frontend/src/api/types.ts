export type TransactionType = "expense" | "income";
export type TransactionRecurringType = "weekly" | "monthly";

export type CommonReturn = {
  status: number;
  data?: unknown;
  msg?: string;
};

export type Transaction = {
  id: string;
  space_id: string;
  type: TransactionType;
  category: string;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string[];
  recurring_type: TransactionRecurringType | null;
};

export type GetAllTransactions = {
  status: number;
  data: {
    total: number;
    total_page: number;
    transactions: Transaction[];
  };
};

export type CreateSpace = {
  status: number;
  data: string;
  msg: string;
};

export type CreateTransactionPayload = {
  spaceId: string;
  type: TransactionType;
  amount: string;
  category?: string;
  description?: string;
  createdAt: string;
  recurring?: TransactionRecurringType;
};

export type UpdateTransactionPayload = Omit<
  CreateTransactionPayload,
  "spaceId"
>;
