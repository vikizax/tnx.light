import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableFooter,
  TablePagination
} from "@mui/material";
import { ColorPalette } from "../../utils/commons/color-palette";
import TablePaginationActions from "./_components/TablePaginationActions";

const DataTable: React.FC = () => {
  return (
    <TableContainer>
      <Table
        sx={{
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
            <TableCell>type</TableCell>
            <TableCell>category</TableCell>
            <TableCell>description</TableCell>
            <TableCell>date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>100.00</TableCell>
            <TableCell>income</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test description</TableCell>
            <TableCell>01-02-2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>200.00</TableCell>
            <TableCell>income</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test description</TableCell>
            <TableCell>02-02-2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>300.00</TableCell>
            <TableCell>income</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test description</TableCell>
            <TableCell>03-02-2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>100.00</TableCell>
            <TableCell>income</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test description</TableCell>
            <TableCell>04-02-2024</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx={{
                color: "white",
              }}
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={6}
              page={1}
              count={10}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              align="right"
              rowsPerPage={10}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
