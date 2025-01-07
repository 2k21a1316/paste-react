import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from 'react-hot-toast';//toaster to show paste is created or etc ,toaster add here so that used to everywhere in the app
import { ThemeProvider } from "../src/components/Theme.jsx";

createRoot(document.getElementById("root")).render(
  //wrap app under provider and import store and provider so that child component of app can access this cenrtalised store
  <StrictMode>
    <Provider store={store}>
      <div className="min-h-screen w-screen overflow-hidden">
      <ThemeProvider>
    <App />
  </ThemeProvider>
        <Toaster position="top-right"/>
      </div>
    </Provider>
  </StrictMode>
);
