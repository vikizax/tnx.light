import Alert from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { ColorPalette } from "../../utils/commons/color-palette";
import { Slide } from "@mui/material";
import { close } from "../../store/slices/snack.slice";
import { useDispatch } from "react-redux";

export type SnackProps = {
  state: {
    open: boolean;
    message: string;
  };
};

export default function Snack({ state }: SnackProps) {
  const dispatch = useDispatch();
  const handleClose = (
    _?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(close());
  };

  return (
    <Snackbar
      open={state.open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{
        horizontal: "left",
        vertical: "top",
      }}
      TransitionComponent={(props) => <Slide {...props} direction="right" />}
    >
      <Alert
        onClose={handleClose}
        sx={{
          width: "100%",
          backgroundColor: ColorPalette.active.bgColor,
          color: ColorPalette.active.color,
          "& svg": {
            color: ColorPalette.active.color,
          },
        }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
}
