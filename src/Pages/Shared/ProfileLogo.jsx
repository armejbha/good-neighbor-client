import React, { useContext } from "react";
import { FiCreditCard } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { MdContactPhone } from "react-icons/md";

import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { IoMdHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext";

const ProfileLogo = () => {
  const { user, userSignOut, theme } = useContext(AuthContext);
  const handleLogout = () => {
    userSignOut()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "text-primary text-lg flex items-center"
      : "text-base-content hover:text-primary text-lg flex items-center";
  return (
    <details className="dropdown dropdown-end">
      <summary className="flex items-center cursor-pointer">
        <img
          src={user?.photoURL}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border border-primary"
        />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-md z-10 w-48 p-2 shadow-md mt-2">
        <ul className="md:hidden">
          <li className="my-2 py-1 border-y border-gray-200">
            <NavLink to="/" className={navLinkStyles}>
              <IoMdHome />
              Home
            </NavLink>
          </li>
          <li className="my-2 py-1 border-b border-gray-200">
            <NavLink to="/allVolunteer" className={navLinkStyles}>
              <GrGroup className="text-black" />
              All Volunteer
            </NavLink>
          </li>
          <li className="my-2 py-1 border-b border-gray-200">
            <NavLink to="/about" className={navLinkStyles}>
              <FcAbout />
              About Us
            </NavLink>
          </li>
          <li className="my-2 py-1 border-b border-gray-200">
            <NavLink to="/contact" className={navLinkStyles}>
              <MdContactPhone />
              Contact Us
            </NavLink>
          </li>
        </ul>
        <li className="my-2 py-1 border-b border-gray-200">
          <NavLink
            to="/dashboard"
            className={`flex items-center text-lg pl-2 `}
          >
            <FiCreditCard />
            Dashboard
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className={`flex items-center text-lg pl-2`}
          >
            <LuLogOut />
            Logout
          </button>
        </li>
      </ul>
    </details>
  );
};

export default ProfileLogo;
