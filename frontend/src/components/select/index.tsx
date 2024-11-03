import { styled, Select, SelectProps } from "@mui/material";

import { ColorPalette, Units } from "../../utils/commons/color-palette";

export type MenuFilterOption = "category" | "date";

const StyledInput = styled(Select)(() => ({
  "&": {
    "&::after": {
      borderColor: ColorPalette.color,
    },
    "& svg": {
      color: "white",
      right: "8px",
    },
  },
  "& .MuiInputBase-input": {
    color: ColorPalette.colorLight,
    position: "relative",
    backgroundColor: ColorPalette.bgColor,
    borderBottom: "2px solid",
    borderColor: ColorPalette.borderColor,
    fontSize: 16,
    padding: "2px 8px",
    "&::placeholder": {
      opacity: 1,
    },
    "&:focus": {
      color: ColorPalette.color,
    },
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: ColorPalette.active.borderColor,
  },
  "& .MuiInput-underline:before": {
    borderBottom: "2px solid",
    borderBottomColor: ColorPalette.borderColor,
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "#262626",
  },
  "& .MuiInputAdornment-root": {
    position: "relative",
    "&:hover::before": {
      borderBottom: "2px solid red",
    },
  },
}));

const SelectField = (props: SelectProps) => {
  return (
    <StyledInput
      {...props}
      variant="standard"
      fullWidth
      MenuProps={{
        sx: {
          "& .MuiPaper-root": {
            color: ColorPalette.color,
            backgroundColor: ColorPalette.bgColorLight2,
            borderRadius: Units.borderRadius,
            "& .MuiList-root": {
              padding: 0,
            },
          },
          "& .MuiMenuItem-root.Mui-selected": {
            backgroundColor: ColorPalette.active.bgColor,
            color: ColorPalette.active.color,
          },
          "& .MuiMenuItem-root:hover": {
            backgroundColor: ColorPalette.bgColorLight,
          },
          "& .MuiMenuItem-root.Mui-selected:hover": {
            backgroundColor: ColorPalette.active.bgColor,
          },
        },
      }}
    />
  );
};

export default SelectField;
