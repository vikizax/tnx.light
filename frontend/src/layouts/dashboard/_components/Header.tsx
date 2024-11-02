import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { Container, Stack, Typography } from "@mui/material";
import { ColorPalette } from "../../../utils/commons/color-palette";

export const Header: React.FC = () => {
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
          alignItems="center"
          paddingRight={"0.2rem"}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
            borderRadius: "100px",
          }}
        >
          <OfflineBoltIcon
            sx={{
              color: ColorPalette.color,
              fontSize: "2rem",
            }}
          />
          <Typography>TnxLight</Typography>
        </Stack>
      </Container>
    </Stack>
  );
};
