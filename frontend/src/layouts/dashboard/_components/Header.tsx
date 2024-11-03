import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import {
  Container,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ColorPalette } from "../../../utils/commons/color-palette";
import { Navigation } from "./Navigation";
import { useNavigate } from "react-router-dom";

const Brand = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
        borderRadius: "100px",
      }}
      gap={1}
      onClick={() => navigate("/")}
    >
      <OfflineBoltIcon
        sx={{
          color: ColorPalette.color,
          fontSize: "2rem",
        }}
      />
      <Typography fontWeight={"bold"}>tnx.light</Typography>
    </Stack>
  );
};

export const Header: React.FC = () => {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      sx={{ color: "#FFF" }}
      flexDirection={"row"}
      padding={"1.2rem"}
      borderBottom={"1px solid #262626"}
    >
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Brand />
          {isScreenSmall && <Navigation />}
        </Stack>
      </Container>
    </Stack>
  );
};
