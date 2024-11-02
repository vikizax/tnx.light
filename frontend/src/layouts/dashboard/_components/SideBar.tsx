import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import SettingsIcon from "@mui/icons-material/Settings";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import { NavButton } from "./NavButton";

export const SideBar: React.FC = () => {
  const params = useParams<{ spaceId: string }>();
  return (
    <Stack
      gap={"10px"}
      width={"120px"}
      alignItems="center"
      paddingTop={"12px"}
    >
      <NavButton
        icon={(sx) => <DashboardIcon sx={sx} />}
        to={`/space/${params.spaceId}`}
        tooltipTxt="Space"
      />
      <NavButton
        icon={(sx) => <ReceiptLongIcon sx={sx} />}
        to={`/space/${params.spaceId}/transactions`}
        tooltipTxt="Transactions"
      />
      <NavButton
        icon={(sx) => <EventRepeatIcon sx={sx} />}
        to={`/transactions`}
        tooltipTxt="Transactions"
      />
      <NavButton
        icon={(sx) => <SettingsIcon sx={sx} />}
        to={`/transactions`}
        tooltipTxt="Transactions"
      />
    </Stack>
  );
};
