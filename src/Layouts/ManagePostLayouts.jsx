import React, { useContext, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { Outlet, useMatches, Link } from "react-router";

import ProfileLogo from "../Pages/Shared/ProfileLogo";
import ManageNavbar from "../Pages/Shared/ManageNavbar";
import { AuthContext } from "../Context/AuthContext";

const ManagePostLayouts = () => {
  const { user } = useContext(AuthContext);
  const matches = useMatches();

  // Set dynamic title
  useEffect(() => {
    const currentMatch = matches[matches.length - 1];
    const pageTitle = currentMatch?.handle?.title
      ? `GoodNeighbor / ManagePost/ ${currentMatch.handle.title}`
      : "GoodNeighbor / ManagePost";
    document.title = pageTitle;
  }, [matches]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="w-full navbar bg-base-100 px-4 shadow-sm sticky top-0 z-100">
          {/* Hamburger for mobile */}
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost lg:hidden p-0 mr-2"
          >
            <FiMenu size={24} />
          </label>
          {/* Page title */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Manage Post</h3>
          </div>

          {/* User Dropdown */}
          <ProfileLogo />
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay lg:hidden"
        ></label>
        <aside className="w-72 bg-base-200 min-h-full p-4">
          {/* Logo */}
          <div className="mb-6">
            <div className="text-4xl font-bold">
              <Link to="/">
                <span className="text-primary">Good</span>
                <span>Neighbor</span>
              </Link>
            </div>
          </div>
          <ManageNavbar />
        </aside>
      </div>
    </div>
  );
};

export default ManagePostLayouts;
