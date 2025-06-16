import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AllVolunteerNeed from "../Pages/AllVolunteer/AllVolunteerNeed";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignIn from "../Pages/SignIn/SignIn";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddVolunteer from "../Pages/AddVolunteer/AddVolunteer";

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
        loader: () => fetch("http://localhost:3000/volunteers"),
        Component: AllVolunteerNeed,
      },
      {
        path: "/addVolunteer",
        element: (
          <PrivateRoutes>
            <AddVolunteer></AddVolunteer>
          </PrivateRoutes>
        ),
      },
      {
        path: "/signIn",
        Component: SignIn,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
