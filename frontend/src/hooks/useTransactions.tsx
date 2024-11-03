import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getAllTransactions } from "../api";
export function useTransactions(spaceId: string) {
  const filters = useSelector((state: RootState) => state.transactionFilter);
  return useQuery({
    queryKey: ["transactions", spaceId, filters],
    queryFn: () => getAllTransactions(spaceId!, filters),
  });
}
