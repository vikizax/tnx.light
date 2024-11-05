import {
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "../../api/types";
import { RootState } from "../../store";
import {
  getFilterValueTyped,
  setFilter,
} from "../../store/slices/transactionFilters.slice";
import { ColorPalette } from "../../utils/commons/color-palette";
import TablePaginationActions from "./_components/TablePaginationActions";
import { Delete, Edit } from "@mui/icons-material";

type DataTableProps = {
  data: Transaction[];
  totalPage: number;
  currentPage?: number;
  editHandler: (id: string) => Promise<void> |  void;
  deleteHandler: (id: string) => Promise<void> |  void;
};

const DataTable = ({
  data,
  totalPage,
  editHandler,
  deleteHandler,
}: DataTableProps) => {
  const dispatch = useDispatch();
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
            <TableCell>actions</TableCell>
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
                <TableCell>
                  <Stack direction={"row"} gap={2}>
                    <IconButton onClick={() => editHandler(id)}>
                      <Edit
                        sx={{ color: ColorPalette.colorLight }}
                        fontSize="small"
                      />
                    </IconButton>
                    <Divider
                      orientation="vertical"
                      sx={{ borderColor: ColorPalette.borderColor }}
                      flexItem
                    />
                    <IconButton onClick={() => deleteHandler(id)}>
                      <Delete
                        sx={{ color: ColorPalette.colorLight }}
                        fontSize="small"
                      />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            )
          )}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: "center" }}>
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
              colSpan={6}
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
