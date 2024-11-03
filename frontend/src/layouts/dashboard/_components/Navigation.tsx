import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useMediaQuery, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import { NavButton } from "./NavButton";

export const Navigation: React.FC = () => {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  const params = useParams<{ spaceId: string }>();
  const tooltipPlacement = isScreenSmall ? "bottom" : "right";
  return (
    <Stack
      gap={"10px"}
      width={isScreenSmall ? undefined : "120px"}
      alignItems="center"
      paddingTop={isScreenSmall ? "0" : "12px"}
      direction={isScreenSmall ? "row" : "column"}
    >
      {/* <NavButton
        icon={(sx) => <DashboardIcon sx={sx} />}
        to={`/space/${params.spaceId}`}
        tooltipTxt="insights"
        tooltipPlacement={tooltipPlacement}
      /> */}
      <NavButton
        icon={(sx) => <ReceiptLongIcon sx={sx} />}
        to={`/space/${params.spaceId}/transactions`}
        tooltipTxt="transactions"
        tooltipPlacement={tooltipPlacement}
      />
      {/* <NavButton
        icon={(sx) => <EventRepeatIcon sx={sx} />}
        to={`/transactions`}
        tooltipTxt="recurring"
        tooltipPlacement={tooltipPlacement}
      /> */}
    </Stack>
  );
};
