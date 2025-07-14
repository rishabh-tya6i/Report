import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaCaretUp } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
        {/* Logo / Menu */}
        <Link to="/daywisereport" className="hover:text-gray-300">
          <MdMenu size={27} />
        </Link>

        {/* Market Indices */}
        <div className="flex gap-6">
          {["Nifty", "Bank Nifty", "Fin Nifty"].map((indexName, i) => (
            <div key={i} className="text-center">
              <p className="text-lg font-semibold">25461</p>
              <h3 className="flex items-center justify-center gap-1 text-sm text-green-400">
                {indexName} <FaCaretUp />
              </h3>
            </div>
          ))}
        </div>

        {/* Theme Toggle & User */}
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="text-white hover:text-yellow-300">
            {theme === "light" ? <MdDarkMode size={27} /> : <MdOutlineLightMode size={27} />}
          </button>

          <div className="flex items-center gap-2">
            {isLoggedIn && <p className="text-sm">Welcome User</p>}
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`flex items-center gap-1 px-4 py-2 rounded-md text-white transition ${
                isLoggedIn ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoggedIn ? <GoPersonFill size={20} /> : "Login"}
            </button>
          </div>
        </div>
      </div>
  );
};

export default Header;
