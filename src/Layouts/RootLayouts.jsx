import React, { useEffect } from "react";
import { Outlet, useMatches } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const MainLayouts = () => {
  const matches = useMatches();

  // Dynamically set the page title
  useEffect(() => {
    const currentMatch = matches[matches.length - 1];
    const pageTitle = currentMatch?.handle?.title
      ? `GoodNeighbor / ${currentMatch.handle.title}`
      : "GoodNeighbor";
    document.title = pageTitle;
  }, [matches]);

  // Hide Navbar and Footer for error routes
  const currentMatch = matches[matches.length - 1];
  const isErrorRoute = currentMatch?.handle?.title === "Page Not Found";

  return (
    <div>
      {!isErrorRoute && <Navbar />}
      <Outlet />
      {!isErrorRoute && <Footer />}
    </div>
  );
};

export default MainLayouts;
