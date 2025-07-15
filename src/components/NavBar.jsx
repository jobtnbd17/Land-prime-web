import React from "react";
import { Link, useNavigate } from "react-router";
import Logo from "../assets/Logo.png";
import useAuthStore from "../store/authStore";

function NavBar() {
  const navigate = useNavigate();
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const user = useAuthStore((state) => state.user);

  const logout = () => {
    actionLogout();
    navigate("/");
  };

  return (
    <div className="bg-[#D7CCC8] shadow-md text-[#4E342E]">
      <div className="mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <img src={Logo} alt="Logo" className="h-9 w-auto" />
        </Link>

        {/* Navigation Links */}
        {!user ? (
          <div className="flex gap-3 text-sm font-medium items-center">
            <Link
              to="/register"
              className="px-4 py-2 rounded-full bg-[#BCAAA4] text-[#4E342E] hover:bg-[#A1887F] transition duration-200"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-[#8D6E63] text-white hover:bg-[#6D4C41] transition duration-200"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 text-sm font-medium items-center">
            <Link
              to="/post"
              className="px-4 py-2 rounded-full bg-[#A1887F] text-white hover:bg-[#8D6E63] transition duration-200"
            >
              Create Post
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full bg-[#EF9A9A] text-[#4E342E] hover:bg-[#E57373] transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
