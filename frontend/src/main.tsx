import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";



const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider theme={theme}> */}
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  </StrictMode>
);
