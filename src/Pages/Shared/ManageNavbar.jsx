import React from "react";
import { FiCreditCard } from "react-icons/fi";
import { NavLink } from "react-router";

const ManageNavbar = () => {
  const navLinkStyles = ({ isActive }) => `
    flex items-center p-2 rounded ${
      isActive
        ? "text-lg  bg-primary font-medium transition"
        : "text-lg font-medium hover:text-secondary"
    }
    `;
  return (
    <ul className="space-y-1">
      <li>
        <NavLink to="/dashboard" end className={navLinkStyles}>
          My Volunteer Posts
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myRequestPost" className={navLinkStyles}>
          My Request Posts
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addVolunteer" className={navLinkStyles}>
          Add Volunteer
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={navLinkStyles}>
          My Profile
        </NavLink>
      </li>

      {/* Add more sidebar links here */}
    </ul>
  );
};

export default ManageNavbar;
