import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./styles/global.scss";
import { LoadingProvider } from "./Context/LoadingContext.jsx";

export const baseUrl = import.meta.env.VITE_BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </StrictMode>
);
