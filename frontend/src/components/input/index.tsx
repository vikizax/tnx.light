import { styled, TextField, TextFieldProps } from "@mui/material";

import { ColorPalette } from "../../utils/commons/color-palette";

export type MenuFilterOption = "category" | "date";

const StyledInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    color: ColorPalette.colorLight,
    position: "relative",
    backgroundColor: ColorPalette.bgColor,
    borderBottom: "2px solid",
    borderColor: ColorPalette.borderColor,
    fontSize: 16,
    padding: "2px 12px",
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
    borderBottomColor: "#262626 !important",
  },
  "& .MuiInputAdornment-root": {
    position: "relative",
    "&:hover::before": {
      borderBottom: "2px solid red",
    },
  },
  "& ::-webkit-calendar-picker-indicator": {
    filter: "invert(1)",
  },
  // "& .MuiInputLabel-root": { color: ColorPalette.color },
  // "& .MuiInputLabel-root.Mui-focused": {
  //   color: ColorPalette.color,
  // },
}));

const Input = (props: Omit<TextFieldProps, "ref">) => {
  return <StyledInput {...props} variant="standard" fullWidth />;
};

export default Input;
