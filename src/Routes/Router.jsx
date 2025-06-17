import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Loading from "../Pages/Shared/Loading";
import PrivateRoutes from "./PrivateRoutes";

// Lazy load all components
const RootLayouts = lazy(() => import("../Layouts/RootLayouts"));
const Home = lazy(() => import("../Pages/Home/Home"));
const AllVolunteerNeed = lazy(() =>
  import("../Pages/AllVolunteer/AllVolunteerNeed")
);
const VolunteerDetails = lazy(() =>
  import("../Pages/VolunteerDetails.jsx/VolunteerDetails")
);
const AddVolunteer = lazy(() => import("../Pages/AddVolunteer/AddVolunteer"));
const SignIn = lazy(() => import("../Pages/SignIn/SignIn"));
const Register = lazy(() => import("../Pages/Register/Register"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage/ErrorPage"));
const ManagePostLayouts = lazy(() =>
  import("../Pages/ManagePostLayouts/ManagePostLayouts")
);
const MyVolunteerPost = lazy(() =>
  import("../Pages/ManagePostLayouts/MyVolunteerPost/MyVolunteerPost")
);
const MyRequestPost = lazy(() =>
  import("../Pages/ManagePostLayouts/MyRequestPost/MyRequestPost")
);
const UpdateVolunteer = lazy(() =>
  import("../Pages/ManagePostLayouts/MyVolunteerPost/UpdateVolunteer")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <RootLayouts />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
        handle: { title: "Home" },
      },
      {
        path: "allVolunteer",
        element: (
          <Suspense fallback={<Loading />}>
            <AllVolunteerNeed />
          </Suspense>
        ),
        handle: { title: "All Volunteer Posts" },
      },
      {
        path: "volunteerDetails/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivateRoutes>
              <VolunteerDetails />
            </PrivateRoutes>
          </Suspense>
        ),
        handle: { title: "Volunteer Details" },
      },
      {
        path: "addVolunteer",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivateRoutes>
              <AddVolunteer />
            </PrivateRoutes>
          </Suspense>
        ),
        handle: { title: "Add Volunteer Post" },
      },
      {
        path: "signIn",
        element: (
          <Suspense fallback={<Loading />}>
            <SignIn />
          </Suspense>
        ),
        handle: { title: "Sign In" },
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
        handle: { title: "Register" },
      },
      {
        path: "manageMyPost",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivateRoutes>
              <ManagePostLayouts />
            </PrivateRoutes>
          </Suspense>
        ),
        handle: { title: "Manage My Posts" },
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <PrivateRoutes>
                  <MyVolunteerPost />
                </PrivateRoutes>
              </Suspense>
            ),
            handle: { title: "My Volunteer Posts" },
          },
          {
            path: "myVolunteerPost",
            element: (
              <Suspense fallback={<Loading />}>
                <PrivateRoutes>
                  <MyVolunteerPost />
                </PrivateRoutes>
              </Suspense>
            ),
            handle: { title: "My Volunteer Posts" },
          },
          {
            path: "myRequestPost",
            element: (
              <Suspense fallback={<Loading />}>
                <PrivateRoutes>
                  <MyRequestPost />
                </PrivateRoutes>
              </Suspense>
            ),
            handle: { title: "My Request Posts" },
          },
          {
            path: "updateVolunteer/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <PrivateRoutes>
                  <UpdateVolunteer />
                </PrivateRoutes>
              </Suspense>
            ),
            handle: { title: "Update Volunteer Post" },
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    ),
    handle: { title: "Page Not Found" },
  },
]);
