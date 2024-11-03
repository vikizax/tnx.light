import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createSpace } from "./api";
import { Box, Container, Stack, Typography } from "@mui/material";
import { ColorPalette } from "./utils/commons/color-palette";
import { Fragment } from "react/jsx-runtime";
import ActionButton from "./components/action-button";

function App() {
  const navigate = useNavigate();
  const { mutateAsync, status } = useMutation({
    mutationFn: createSpace,
  });

  const handleStartAction = async () => {
    const { data: spaceId } = await mutateAsync();

    if (spaceId !== undefined) {
      navigate(`space/${spaceId}/transactions`);
    }
  };

  function GradientCircularProgress() {
    return (
      <Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </Fragment>
    );
  }

  return (
    <Container>
      <Stack
        justifyContent={"center"}
        width={"100%"}
        height={"100dvh"}
        textAlign={"center"}
        alignItems={"center"}
        gap={4}
      >
        <Stack
          direction={"row"}
          textAlign={"center"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          flexWrap={"wrap"}
        >
          <Typography
            variant="h1"
            sx={{
              color: ColorPalette.color,
              fontSize: "42px",
              fontWeight: "bold",
            }}
            className="shinny"
          >
            welcome to tnx.light
          </Typography>

          <OfflineBoltIcon
            sx={{
              color: ColorPalette.color,
              fontSize: "42px",
            }}
          />
        </Stack>

        <Typography
          variant="body1"
          sx={{
            color: ColorPalette.color,
          }}
        >
          your companion to manage all your transactions
        </Typography>
        {status === "idle" && (
          <ActionButton isactive onClick={handleStartAction}>
            get started now!
          </ActionButton>
        )}
        {status === "pending" && <GradientCircularProgress />}
      </Stack>
    </Container>
  );
}

export default App;