import { createBrowserRouter } from "react-router";

import Home from "../pages/Home/Home/Home";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../components/Login/Login";
import ScholarshipDetails from "../pages/Home/ScholarshipsDetails/ScholarshipsDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "scholarships/:id",
        Component: ScholarshipDetails,
      },
    ],
  },
]);
