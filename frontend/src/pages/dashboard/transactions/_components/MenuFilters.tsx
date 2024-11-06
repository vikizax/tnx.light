import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Stack } from "@mui/material";
import ActionButton from "../../../../components/action-button";
import Input from "../../../../components/input";
import { ColorPalette } from "../../../../utils/commons/color-palette";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getFilterValueTyped,
  setFilter,
} from "../../../../store/slices/transactionFilters.slice";

export type MenuFilterOption = "category" | "date";

const MenuFilters = ({
  filter,
  handler,
  menuRef,
}: {
  filter: MenuFilterOption;
  handler: React.Dispatch<React.SetStateAction<MenuFilterOption | null>>;
  menuRef: React.Ref<HTMLInputElement>;
}) => {
  const [state, setState] = useState<string>("");
  const dispatch = useDispatch();

  const handleDispatchAction = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setState("");
      handler(null);
      return;
    }
    if (e.key !== "Enter") return;
    if (state.trim().length === 0) return;
    dispatch(
      setFilter({
        filter: filter,
        value: getFilterValueTyped(filter, state),
      })
    );
    setState("");
    handler(null);
  };

  const handleAddBtnDispatchAction = () => {
    if (state.trim().length === 0) return;
    handler(null);
    dispatch(
      setFilter({
        filter: filter,
        value: getFilterValueTyped(filter, state),
      })
    );
    setState("");
  };

  const handleRemoveActions = () => {
    console.log("removed called");
    handler(null);
    dispatch(
      setFilter({
        filter: filter,
        value: getFilterValueTyped(filter, ""),
      })
    );
  };

  const MenuFilterActions = () => {
    return (
      <Stack direction={"row"} gap={1}>
        <ActionButton
          sx={{ minWidth: 0, padding: 0 }}
          onClick={handleAddBtnDispatchAction}
        >
          <AddIcon />
        </ActionButton>
        <ActionButton
          sx={{ minWidth: 0, padding: 0 }}
          onClick={handleRemoveActions}
        >
          <ClearIcon />
        </ActionButton>
      </Stack>
    );
  };

  switch (filter) {
    case "category":
      return (
        <Stack direction={"row"} gap={2}>
          <Input
            inputRef={menuRef}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    sx={{
                      color: ColorPalette.color,
                    }}
                    position="start"
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            onChange={(e) => setState(e.target.value)}
            onKeyDown={handleDispatchAction}
            value={state}
            placeholder="search category"
            size="small"
            variant="standard"
          />

          <MenuFilterActions />
        </Stack>
      );
    case "date":
      return (
        <Stack direction={"row"} gap={2}>
          <Input
            inputRef={menuRef}
            type="date"
            placeholder="search date"
            size="small"
            variant="standard"
            onChange={(e) => setState(e.target.value)}
            onKeyDown={handleDispatchAction}
            value={state}
          />
          <MenuFilterActions />
        </Stack>
      );
  }
};

export default MenuFilters;
