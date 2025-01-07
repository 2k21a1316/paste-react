import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import "./App.css";
const storedTheme = localStorage.getItem("theme") || "light";
function App() {
  const [theme, setTheme] = useState("storedTheme"); // Default theme

  // Apply the theme to the body
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark
  // const toggleTheme = () => {
  //   setTheme((prevTheme) => {
  //     const newTheme = prevTheme === "light" ? "dark" : "light";
  //     console.log("Theme toggled to:", newTheme);
  //     return newTheme;
  //   });
  // };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Create the router inside the App component
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="w-full h-full flex flex-col">
          <Navbar theme={storedTheme} toggleTheme={toggleTheme} />
          <Home theme={storedTheme} />
        </div>
      ),
    },
    {
      path: "/pastes",
      element: (
        <div className="w-full h-full flex flex-col">
          <Navbar theme={storedTheme} toggleTheme={toggleTheme} />
          <Paste theme={storedTheme}/>
        </div>
      ),
    },
    {
      path: "/pastes/:id",
      element: (
        <div className="w-full h-full flex flex-col">
          <Navbar theme={storedTheme} toggleTheme={toggleTheme} />
          <ViewPaste theme={storedTheme}/>
        </div>
      ),
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
