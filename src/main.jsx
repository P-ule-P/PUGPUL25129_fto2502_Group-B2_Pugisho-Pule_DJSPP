import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { SearchProvider } from "./context/SearchContext.jsx";
import "./styles/App.css";
import "./styles/Mediaqueries.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioPlayerProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AudioPlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
