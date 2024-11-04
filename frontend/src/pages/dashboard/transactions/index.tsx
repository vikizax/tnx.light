import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteTransactionByTnxIdAndSpaceId } from "../../../api";
import { Transaction } from "../../../api/types";
import ActionButton from "../../../components/action-button";
import DataTable from "../../../components/data-table";
import PageHead from "../../../components/page-head";
import { useTransactions } from "../../../hooks/useTransactions";
import { RootState } from "../../../store";
import { open } from "../../../store/slices/snack.slice";
import {
  getFilterValueTyped,
  setFilter,
  TransactionFiltersState,
} from "../../../store/slices/transactionFilters.slice";
import { ColorPalette, Units } from "../../../utils/commons/color-palette";
import FilterChip from "./_components/FilterChips";
import MenuFilters from "./_components/MenuFilters";
import TnxDrawer from "./_components/TnxDrawer";
type MenuFilterOption = "category" | "date";

const TransactionsPage = () => {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.between("xs", 950));
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);
  const menuOptionRef = useRef<HTMLInputElement>(null);
  const params = useParams<{ spaceId: string }>();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.transactionFilter);
  const queryClient = useQueryClient();
  const { data, isLoading } = useTransactions(params.spaceId!);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      spaceId,
      tnxId,
    }: {
      spaceId: string;
      tnxId: string;
    }) => await deleteTransactionByTnxIdAndSpaceId(spaceId, tnxId),
  });

  let filterChipValues = Object.keys(filters)
    .filter(
      (key) =>
        filters[key as keyof TransactionFiltersState] !== undefined &&
        filters[key as keyof TransactionFiltersState] !== "" &&
        key !== "limit" &&
        key !== "page"
    )
    .map((key) => ({
      key: key,
      value: filters[key as keyof TransactionFiltersState] as string,
    }));

  filterChipValues =
    filterChipValues.length === 0
      ? [{ key: "all", value: "all" }]
      : filterChipValues;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [editTnx, setEditTnx] = useState<Omit<
    Transaction,
    "space_id" | "updated_at"
  > | null>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
    setEditTnx(null);
  };

  const [currentActiveMenuOpts, setCurrentActiveMenuOpts] =
    useState<MenuFilterOption | null>(null);

  const handleFilterBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClick = (menuOption: MenuFilterOption) => {
    setMenuAnchorEl(null);
    setCurrentActiveMenuOpts(menuOption);
    console.log(menuOptionRef.current);
    if (menuOptionRef.current) {
      menuOptionRef.current.focus();
    }
  };

  const handleTransactionDelete = async (id: string) => {
    await mutateAsync({
      spaceId: params.spaceId!,
      tnxId: id,
    });
    queryClient.invalidateQueries({
      queryKey: ["transactions"],
    });
    dispatch(open("transaction deleted"));
  };

  useEffect(() => {
    if (currentActiveMenuOpts && menuOptionRef.current) {
      menuOptionRef.current.focus();
    }
  }, [currentActiveMenuOpts]);

  return (
    <>
      <Stack gap={"2.8rem"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
          flexWrap={"wrap"}
        >
          <PageHead
            heading="transactions"
            subheading="manage your transactions"
          />

          <ActionButton
            sx={{ minWidth: 0 }}
            tooltipProps={{
              title: "add transaction",
              placement: "bottom",
            }}
            onClick={toggleDrawer(true)}
          >
            <AddIcon />
          </ActionButton>
        </Stack>

        {(isLoading || isPending) && (
          <CircularProgress
            sx={{
              color: ColorPalette.color,
            }}
            size={24}
          />
        )}

        {!isLoading && !isPending && (
          <Stack direction={"row"} gap={4} flexWrap="wrap" padding={1}>
            <Stack gap={1} direction={isScreenSmall ? "row" : "column"}>
              <ActionButton
                onClick={() =>
                  dispatch(
                    setFilter({
                      filter: "type",
                      value: getFilterValueTyped("type", "income"),
                    })
                  )
                }
                isactive={filters.type ? filters.type === "income" : false}
              >
                income
              </ActionButton>
              <ActionButton
                onClick={() =>
                  dispatch(
                    setFilter({
                      filter: "type",
                      value: getFilterValueTyped("type", "expense"),
                    })
                  )
                }
                isactive={filters.type ? filters.type === "expense" : false}
              >
                expense
              </ActionButton>
              <ActionButton
                endIcon={<FilterListIcon />}
                onClick={handleFilterBtnClick}
              >
                filters
              </ActionButton>
              <Menu
                id="basic-menu"
                anchorEl={menuAnchorEl}
                open={menuOpen}
                onClose={() => setMenuAnchorEl(null)}
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
                      backgroundColor: ColorPalette.bgColor,
                      border: `1px solid ${ColorPalette.borderColor}`,
                      padding: 0,
                    },
                  },
                }}
              >
                <MenuItem onClick={() => handleFilterMenuClick("category")}>
                  category
                </MenuItem>
                <MenuItem onClick={() => handleFilterMenuClick("date")}>
                  date
                </MenuItem>
              </Menu>
            </Stack>

            <Stack width={"100%"} gap={2} flex={1}>
              <Stack
                direction={"row"}
                gap={2}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <FilterChip
                  data={filterChipValues}
                  onDelete={(key) => {
                    console.log("delete " + key);
                    if (key === "all") return;
                    dispatch(
                      setFilter({
                        filter: key as keyof TransactionFiltersState,
                        value: "",
                      })
                    );
                  }}
                />

                {currentActiveMenuOpts && (
                  <MenuFilters
                    filter={currentActiveMenuOpts}
                    handler={setCurrentActiveMenuOpts}
                    menuRef={menuOptionRef}
                  />
                )}
              </Stack>
              <Box
                border={`1px solid ${ColorPalette.borderColor}`}
                borderRadius={Units.borderRadius}
              >
                <DataTable
                  data={data?.data.transactions ?? []}
                  totalPage={data?.data.total ?? 0}
                  editHandler={(id) => {
                    const tnx = data!.data.transactions.find(
                      (tnx) => tnx.id === id
                    );
                    setEditTnx(tnx ?? null);
                  }}
                  deleteHandler={handleTransactionDelete}
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </Stack>
      <TnxDrawer
        open={editTnx ? true : drawerOpen}
        toggleDrawer={toggleDrawer}
        mode={editTnx ? { type: "update", data: editTnx } : { type: "add" }}
      />
    </>
  );
};

export default TransactionsPage;
