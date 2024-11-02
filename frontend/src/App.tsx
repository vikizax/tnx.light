import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createSpace } from "./api";

function App() {
  const navigate = useNavigate();
  const { mutateAsync, status } = useMutation({
    mutationFn: createSpace,
  });

  const handleStartAction = async () => {
    const { data: spaceId } = await mutateAsync();

    if (spaceId !== undefined) {
      navigate(`space/${spaceId}`);
    }
  };

  return (
    <div>
      <h1>Welcome to the APP 🚀 this is going to be the landing page</h1>
      {status === "idle" && (
        <Button onClick={handleStartAction} type="button">
          Start
        </Button>
      )}
      {status === "pending" && <CircularProgress />}
    </div>
  );
}

export default App;
