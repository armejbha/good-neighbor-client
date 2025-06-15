import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AllVolunteerNeed from "../Pages/AllVolunteer/AllVolunteerNeed";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allVolunteer",
        Component: AllVolunteerNeed,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
