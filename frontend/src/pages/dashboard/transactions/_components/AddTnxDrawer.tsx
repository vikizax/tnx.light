import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Divider,
    Drawer,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import ActionButton from "../../../../components/action-button";
import { ColorPalette } from "../../../../utils/commons/color-palette";
import AddTnxForm from "./AddTnxForm";

export type AddTnxDrawerProps = {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
};


const AddTnxDrawer = ({ open, toggleDrawer }: AddTnxDrawerProps) => {
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
        <Stack direction={"row"} justifyContent={"space-between"} padding={2} alignItems={'center'}>
          <Typography variant="h5" sx={{color: ColorPalette.colorLight}}>add transaction</Typography>
          <ActionButton
            tooltipProps={{ title: "close", placement: "left" }}
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </ActionButton>
        </Stack>
        <Divider sx={{ borderColor: ColorPalette.borderColor, marginBottom:2 }} />
        <AddTnxForm toggleDrawer={toggleDrawer}/>
      </Box>
    </Drawer>
  );
};

export default AddTnxDrawer;
