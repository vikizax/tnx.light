import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../layouts/dashboard";
import HomePage from "../pages/dashboard/home";
import TransactionsPage from "../pages/dashboard/transactions";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/space/:spaceId",
    element: <DashboardLayout />,
    children: [
      {
        path: "/space/:spaceId",
        element: <HomePage />,
      },
      {
        path: "/space/:spaceId/transactions",
        element: <TransactionsPage />,
      },
    ],
  },
  {
    path: "/test",
    element: <div>THIS IS A TEST ROUTE!</div>,
  },
  {
    path: "*",
    element: <h2>Its going to be not found here soon</h2>,
  },
]);
