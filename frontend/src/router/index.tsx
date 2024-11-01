import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/test',
    element: <div>THIS IS A TEST ROUTE!</div>
  }
]);
