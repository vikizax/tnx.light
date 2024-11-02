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
    `${import.meta.env.VITE_API_URL}/api/spaces/1/transactions`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export type CreateSpace = {
  status: number;
  data: string;
  msg: string;
};

export async function createSpace(): Promise<CreateSpace> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/spaces`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
