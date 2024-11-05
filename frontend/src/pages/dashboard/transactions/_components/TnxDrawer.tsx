import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ActionButton from "../../../../components/action-button";
import { ColorPalette } from "../../../../utils/commons/color-palette";
import TnxForm from "./TnxForm";
import { Transaction } from "../../../../api/types";

type TnxModeDrawerType =
  | {
      type: "add";
    }
  | {
      type: "update";
      data: Omit<Transaction, "updated_at" | "space_id">;
    };

export type TnxDrawerProps = {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
  mode: TnxModeDrawerType;
};

const TnxDrawer = ({ open, toggleDrawer, mode }: TnxDrawerProps) => {
  const theme = useTheme();
  const isDrawerFullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
      <Box
        sx={{
          width: isDrawerFullScreen ? "100dvw" : 450,
          height: "100%",
          backgroundColor: ColorPalette.bgColor,
        }}
        role="presentation"
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          padding={2}
          alignItems={"center"}
        >
          <Typography variant="h5" sx={{ color: ColorPalette.colorLight }}>
            {mode.type} transaction
          </Typography>
          <ActionButton
            tooltipProps={{ title: "close", placement: "left" }}
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </ActionButton>
        </Stack>
        <Divider
          sx={{ borderColor: ColorPalette.borderColor, marginBottom: 2 }}
        />
        <TnxForm
          toggleDrawer={toggleDrawer}
          initialFormData={
            mode.type === "update"
              ? {
                  ...mode.data,
                  tnxId: mode.data.id,
                  date: mode.data.created_at.split("T")[0],
                  isRecurring: Boolean(mode.data.recurring_type),
                  recurrenceFrequency: mode.data.recurring_type ?? "weekly",
                }
              : undefined
          }
        />
      </Box>
    </Drawer>
  );
};

export default TnxDrawer;
