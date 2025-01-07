import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import React, { useEffect, useState } from "react";
import "./App.css";

const storedTheme = localStorage.getItem("theme") || "light";

function App() {
  const [theme, setTheme] = useState(storedTheme); // Default theme

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <div className="w-full h-full flex flex-col">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/pastes" element={<Paste theme={theme} />} />
          <Route path="/pastes/:id" element={<ViewPaste theme={theme} />} />
          {/* Fallback for unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
