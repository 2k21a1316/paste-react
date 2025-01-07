import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <div
      className="w-full h-[45px] flex justify-center items-center p-4 gap-x-5"
      style={{
        background: theme === "light" ? "#ffffff" : "#1e1e1e",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      {NavbarData.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold text-xl"
              : "text-gray-300 font-medium text-xl"
          }
        >
          {link.title}
        </NavLink>
      ))}
      <button
        onClick={toggleTheme}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
          marginLeft: "auto",
        }}
        aria-label="Toggle Theme"
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default Navbar;
