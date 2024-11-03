import { TransactionFiltersState } from "../store/slices/transactionFilters.slice";
import { sleep } from "../utils/commons/sleep";
import {
  CommonReturn,
  CreateSpace,
  CreateTransactionPayload,
  GetAllTransactions,
} from "./types";

export async function getAllTransactions(
  spaceId: string,
  filters?: TransactionFiltersState
): Promise<GetAllTransactions> {
  console.log({ filters });
  await sleep(2000);
  const baseUrl = `${
    import.meta.env.VITE_API_URL
  }/api/spaces/${spaceId}/transactions`;

  const params = new URLSearchParams({});

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof TransactionFiltersState];
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function createSpace(): Promise<CreateSpace> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/spaces`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function createTransaction(
  payload: CreateTransactionPayload
): Promise<CommonReturn> {
  // await sleep(5000);
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/spaces/${
      payload.spaceId
    }/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
