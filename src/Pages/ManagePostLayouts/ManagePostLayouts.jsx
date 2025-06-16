// ManagePostsLayout.jsx
import { useContext } from "react";
import { NavLink } from "react-router";
import { Link, Outlet } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const ManagePostsLayout = () => {
  const { theme } = useContext(AuthContext);

  const navLinkStyles = ({ isActive }) =>
    `${
      isActive
        ? "bg-primary text-white"
        : theme === "dark"
        ? "text-white"
        : "text-black"
    } 
    block p-2 rounded text-lg font-medium transition hover:bg-primary hover:text-white`;
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 bg-base-200 p-1 md:border-r">
        <h2 className="text-xl font-bold mb-6 ml-2 md:ml-0">Manage Posts</h2>
        <ul className="space-y-4 flex flex-row md:flex-col gap-5 md:gap-0">
          <li>
            <NavLink to="myVolunteerPost" className={navLinkStyles}>
              My Volunteer Posts
            </NavLink>
          </li>
          <li>
            <NavLink to="myRequestPost" className={navLinkStyles}>
              My Request Posts
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagePostsLayout;
