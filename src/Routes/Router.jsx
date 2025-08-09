import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Loading from "../Pages/Shared/Loading";
import PrivateRoutes from "./PrivateRoutes";
// import ManagePost from "../Pages/ManagePostLayouts/ManagePost";
import ContactUs from "../Pages/ContactUs/ContactUs";

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
const AboutUs = lazy(() => import("../Pages/AboutUs/AboutUs"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage/ErrorPage"));
const ManagePostLayouts = lazy(() => import("../Layouts/ManagePostLayouts"));
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
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loading />}>
            <ContactUs />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
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
        path: "/dashboard/myVolunteerPost",
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
        path: "/dashboard/myRequestPost",
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
        path: "/dashboard/addVolunteer",
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
        path: "/dashboard/updateVolunteer/:id",
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
