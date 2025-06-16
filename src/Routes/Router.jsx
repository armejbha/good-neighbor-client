import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AllVolunteerNeed from "../Pages/AllVolunteer/AllVolunteerNeed";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignIn from "../Pages/SignIn/SignIn";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddVolunteer from "../Pages/AddVolunteer/AddVolunteer";
import VolunteerDetails from "../Pages/VolunteerDetails.jsx/VolunteerDetails";
import ManagePostLayouts from "../Pages/ManagePostLayouts/ManagePostLayouts";
import MyVolunteerPost from "../Pages/ManagePostLayouts/MyVolunteerPost/MyVolunteerPost";
import MyRequestPost from "../Pages/ManagePostLayouts/MyRequestPost/MyRequestPost";
import UpdateVolunteer from "../Pages/ManagePostLayouts/MyVolunteerPost/UpdateVolunteer";

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
      {
        path: "/volunteerDetails/:id",
        element: (
          <PrivateRoutes>
            <VolunteerDetails></VolunteerDetails>
          </PrivateRoutes>
        ),
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
      {
        path: "/manageMyPost",
        element: (
          <PrivateRoutes>
            <ManagePostLayouts></ManagePostLayouts>
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoutes>
                <MyVolunteerPost></MyVolunteerPost>
              </PrivateRoutes>
            ),
          },
          {
            path: "myVolunteerPost",
            element: (
              <PrivateRoutes>
                <MyVolunteerPost></MyVolunteerPost>
              </PrivateRoutes>
            ),
          },
          {
            path: "/manageMyPost/updateVolunteer/:id",
            loader: ({ params }) =>
              fetch(`http://localhost:3000/volunteersDetails/${params.id}`),
            element: (
              <PrivateRoutes>
                <UpdateVolunteer></UpdateVolunteer>
              </PrivateRoutes>
            ),
          },
          {
            path: "myRequestPost",
            element: (
              <PrivateRoutes>
                <MyRequestPost></MyRequestPost>
              </PrivateRoutes>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
