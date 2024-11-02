import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import { ColorPalette } from "../../utils/commons/color-palette";
import { Header } from "./_components/Header";
import { SideBar } from "./_components/SideBar";

export default function DashboardLayout() {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
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
          <SideBar />
          <Stack width={"100%"} height={"100%"}>
            <Outlet />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
