import { createBrowserRouter } from "react-router";

import Home from "../pages/Home/Home/Home";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../components/Login/Login";
import ScholarshipDetails from "../pages/Home/ScholarshipsDetails/ScholarshipsDetails";
import Register from "../components/Register/Register";
import AllScholarships from "../pages/Home/AllScholarships/AllScholarships";
import Page404 from "../pages/Page404/Page404";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserInfo from "../pages/Dashboard/UserInfo/UserInfo";
import AdminRoute from "./AdminRoute";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";

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
      {
        path: "register",
        Component: Register,
      },
      {
        path: "AllScholarships",
        Component: AllScholarships,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <UserInfo></UserInfo>
          </PrivateRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UsersManagement></UsersManagement>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: Page404,
  },
]);
