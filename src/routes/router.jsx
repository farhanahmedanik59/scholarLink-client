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
import AddScholarships from "../pages/Dashboard/AddScholarships/AddScholarships";
import ManageScholarships from "../pages/Dashboard/ManageScholarsips/ManageScholarsips";
import MyApplications from "../pages/Dashboard/Myaplications/Myaplications";
import PaymentSuccess from "../components/paymentSuccess/paymentSuccess";
import PaymentError from "../components/PaymentError/PaymentError";
import WelcomeDashboard from "../components/DashboardWelcome/WelcomeDashboard";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import ManageApplications from "../pages/Dashboard/ManageApplications/ManageApplications";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";

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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: WelcomeDashboard,
      },
      {
        path: "myProfile",
        element: <UserInfo></UserInfo>,
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "addScholarships",
        element: (
          <AdminRoute>
            <AddScholarships></AddScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "manageScholarships",
        element: (
          <AdminRoute>
            <ManageScholarships></ManageScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "myApplication",
        Component: MyApplications,
      },
      {
        path: "myReviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "ManageApplications",
        element: (
          <PrivateRoute>
            <ManageApplications></ManageApplications>
          </PrivateRoute>
        ),
      },
      {
        path: "AllReviews",
        Component: AllReviews,
      },
    ],
  },
  {
    path: "payment-success",
    Component: PaymentSuccess,
  },
  {
    path: "payment-error",
    element: (
      <PrivateRoute>
        <PaymentError></PaymentError>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    Component: Page404,
  },
]);
