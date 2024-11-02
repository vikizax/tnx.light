import { Box, Stack, Menu, MenuItem } from "@mui/material";
import ActionButton from "../../../components/action-button";
import DataTable from "../../../components/data-table";
import PageHead from "../../../components/page-head";
import { ColorPalette, Units } from "../../../utils/commons/color-palette";
import FilterChip from "./_components/FilterChips";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

const TransactionsPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack gap={"2.8rem"}>
      <PageHead
        heading="transactions"
        subheading="manage your transactions @income"
      />

      <Stack direction={"row"} gap={4} flexWrap="wrap">
        <Stack gap={1}>
          <ActionButton isActive>income</ActionButton>
          <ActionButton>expense</ActionButton>
          <ActionButton endIcon={<FilterListIcon />} onClick={handleClick}>
            filters
          </ActionButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "menu-button",
              sx: {
                color: "white",
                padding: 0,
                "& li:hover": {
                  backgroundColor: ColorPalette.hoverBgColor,
                },
              },
            }}
            slotProps={{
              paper: {
                sx: {
                  marginTop: 1,
                  borderRadius: Units.borderRadius,
                  backgroundColor: "transparent",
                  border: `1px solid ${ColorPalette.borderColor}`,
                  padding: 0,
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}>category</MenuItem>
            <MenuItem onClick={handleClose}>date</MenuItem>
          </Menu>
        </Stack>

        <Stack width={"100%"} gap={2} flex={1}>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <FilterChip
              data={[
                { id: 1, label: "income" },
                { id: 2, label: "category" },
                { id: 3, label: "date 03-02-2024 to 10-02-2024" },
              ]}
              onDelete={(id) => console.log("delete " + id)}
            />
          </Stack>
          <Box
            border={`1px solid ${ColorPalette.borderColor}`}
            borderRadius={Units.borderRadius}
            flex={1}
          >
            <DataTable />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TransactionsPage;
