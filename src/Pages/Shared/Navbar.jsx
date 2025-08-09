import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import ProfileLogo from "./ProfileLogo";
import { FiCreditCard } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userSignOut, theme, toggleTheme } = useContext(AuthContext);

  // desktop navlink styles
  const navLinkStyles = ({ isActive }) =>
    `${
      isActive ? "text-primary" : theme === "dark" ? "text-white" : "text-black"
    } 
    text-lg font-medium transition hover:text-secondary`;

  // mobile navlink styles
  const mobileNavLinkStyles = ({ isActive }) =>
    `${
      isActive ? "text-primary" : theme === "dark" ? "text-black" : "text-black"
    } 
    text-lg font-medium transition hover:text-secondary`;

  // signout
  const handleLogout = () => {
    userSignOut()
      .then(() => {
        toast.success("Logged out successfully!");
        // navigate("/signIn");
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };
  return (
    <nav
      className={`px-2 md:px-0 sticky top-0 left-0 right-0 z-50 shadow ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <div className="text-3xl font-bold">
            <Link to="/">
              <span className="">Good</span>
              <span className="text-primary">Neighbor</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/allVolunteer" className={navLinkStyles}>
              All Volunteer
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              About Us            
              </NavLink>
            <NavLink to="/contact" className={navLinkStyles}>
              Contact Us
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <div>
              <button
                onClick={toggleTheme}
                className="hover:cursor-pointer text-xl p-2 rounded-full transition"
              >
                {theme === "light" ? (
                  <FaMoon className="text-gray-800" />
                ) : (
                  <FaSun className="text-yellow-400" />
                )}
              </button>
            </div>

            {/* User Avatar / Login */}
            {user ? (
              <ProfileLogo></ProfileLogo>
            ) : (
              <Link
                to="/signIn"
                className="btn btn-md border-0 outline-0 bg-primary text-white text-lg px-6 hover:bg-secondary"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Dropdown */}
          <div className="flex md:hidden items-center">
            <div>
              <button
                onClick={toggleTheme}
                className="hover:cursor-pointer text-xl p-2 rounded-full transition"
              >
                {theme === "light" ? (
                  <FaMoon className="text-gray-800" />
                ) : (
                  <FaSun className="text-yellow-400" />
                )}
              </button>
            </div>
            
            <div className="dropdown dropdown-end ml-2">
              {
                user ? 
                <>
                <div tabIndex={0}>
                <img
                  id="user-avatar"
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 object-cover rounded-full border-2 border-primary cursor-pointer"
                />
              </div>
                </>
                :
                 <>
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <TiThMenu className="text-2xl text-primary" />
                  </label>
              </>
              }
              <ul
                tabIndex={0}
                className="dropdown-content mt-3 z-[1] menu p-2 shadow rounded-box w-60 bg-white text-black "
              >
                <li>
                  <NavLink to="/" className={mobileNavLinkStyles}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/allVolunteer" className={mobileNavLinkStyles}>
                    All Volunteer
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={mobileNavLinkStyles}>
              About Us            
              </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={mobileNavLinkStyles}>
              Contact Us
            </NavLink>
                </li>
                <li>
                  {
                    user && <NavLink
                              to="/dashboard"
                              className={mobileNavLinkStyles}
                            >
                              Dashboard
                            </NavLink>
                  }
                </li>
                {user ? (
                  <li className="mt-4">
                    <button
                      onClick={handleLogout}
                      className="btn btn-md border-0 outline-0 bg-primary text-white text-lg px-6 hover:bg-secondary"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <Link
                    to="/signIn"
                    className="btn btn-md border-0 outline-0 bg-primary text-white text-lg px-6 hover:bg-secondary"
                  >
                    Login
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
