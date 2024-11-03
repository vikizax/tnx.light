import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ColorPalette } from "../../utils/commons/color-palette";
import TablePaginationActions from "./_components/TablePaginationActions";
import { Transaction } from "../../api/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterValueTyped,
  setFilter,
} from "../../store/slices/transactionFilters.slice";
import { RootState } from "../../store";

type DataTableProps = {
  data: Transaction[];
  totalPage: number;
  currentPage?: number;
};

const DataTable = ({ data, totalPage }: DataTableProps) => {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(0);
  // const [rows, setRows] = useState(10);

  const page = useSelector((state: RootState) => state.transactionFilter.page);
  const rows = useSelector((state: RootState) => state.transactionFilter.limit);

  return (
    <TableContainer sx={{ overflow: "auto", maxWidth: "100%", padding: 0 }}>
      <Table
        sx={{
          minWidth: "650px",
          color: ColorPalette.color,
          "& .MuiTableCell-root": {
            color: ColorPalette.color,
            borderBottomColor: `${ColorPalette.borderColor}`,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>tnxid</TableCell>
            <TableCell>amount</TableCell>
            <TableCell>category</TableCell>
            <TableCell>description</TableCell>
            <TableCell>date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(
            ({ id, amount, category, created_at, description }, idx) => (
              <TableRow key={`${idx}-${id}`}>
                <TableCell>{id}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{created_at.split("T")[0]}</TableCell>
              </TableRow>
            )
          )}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                no data ,maybe check your{" "}
                <strong>
                  <u>filters</u>
                </strong>{" "}
                or try adding{" "}
                <strong>
                  <u>new transaction</u>
                </strong>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              sx={{
                color: "white",
              }}
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={5}
              page={page - 1}
              count={totalPage}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              align="right"
              rowsPerPage={rows}
              onPageChange={(_, page) => {
                dispatch(
                  setFilter({
                    filter: "page",
                    value: getFilterValueTyped("page", page + 1),
                  })
                );
              }}
              onRowsPerPageChange={(e) => {
                dispatch(
                  setFilter({
                    filter: "limit",
                    value: getFilterValueTyped("limit", +e.target.value),
                  })
                );
              }}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
