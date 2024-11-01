export type Transaction = {
  id: string;
  space_id: string;
  type: "expense" | "income";
  category: string;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string[];
};

export type GetAllTransactions = {
  status: number;
  data: Transaction[];
};

export async function getAllTransactions(): Promise<GetAllTransactions> {
  const response = await fetch(
    "http://localhost:4000/api/spaces/1/transactions"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
