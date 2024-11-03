import { Container, useMediaQuery, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import { ColorPalette } from "../../utils/commons/color-palette";
import { Header } from "./_components/Header";
import { Navigation } from "./_components/Navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import Snack from "../../components/snack";

export default function DashboardLayout() {
  const snackState = useSelector((state: RootState) => state.snack)
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      sx={{
        backgroundColor: ColorPalette.bgColor,
      }}
    >
      <Header />
      <Container
        sx={{
          height: "100%",
        }}
      >
        <Stack
          flexDirection={"row"}
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          {!isScreenSmall && <Navigation />}
          <Stack width={"100%"}>
            <Outlet />
          </Stack>
        </Stack>
      </Container>
      <Snack state={snackState}/>
    </Stack>
  );
}
