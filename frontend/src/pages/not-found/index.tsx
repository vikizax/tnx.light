import { Stack, Typography } from "@mui/material";
import NotFoundSvg from "./404.svg?react";
import { ColorPalette } from "../../utils/commons/color-palette";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Stack
      height="100dvh"
      textAlign={"center"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        backgroundColor: ColorPalette.bgColorLight2,
      }}
    >
      <NotFoundSvg width={"350"} height={"350"} />
      <Typography
        sx={{
          color: ColorPalette.color,
        }}
      >
        you lost your way from{" "}
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <u>tnx.light</u>
        </Link>
      </Typography>
    </Stack>
  );
};

export default NotFound;
