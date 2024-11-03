import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainComp from "./_components/Main/Main.jsx";
import { ContextProvider } from "../context-Api/ContextAPI.jsx";
import Profile from "./_components/Main/Profile/Profile.jsx";
import Category from "./_components/Main/Category/Category.jsx";
import Admin from "./_components/Admin/Admin.jsx";
import Login from "./_components/Admin/login/Login.jsx";
import HamburgerMenu from "./_components/Hamburger/Hamburger.jsx";
import Dashboard from "./_components/Dashboard/Dashboard.jsx";
import Layout from "./_components/Dashboard/Layout.jsx";
import DashboardPage from "./_components/Dashboard/DashboardPage.jsx";
import OrdersPage from "./_components/Dashboard/Order.jsx";
import DeleteCategory from "./_components/Admin/Main/DeleteCategory/DeleteCategory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextProvider>
        <App />
      </ContextProvider>
    ),
    children: [
      { path: "/", element: <MainComp /> },
      { path: "/profile", element: <Profile /> },
      { path: "/:category", element: <Category /> },
      { path: "*", element: <Category /> },
      { path: "/hamburger", element: <HamburgerMenu /> },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Layout />,
        children: [
          { path: "/dashboard/category", element: <DashboardPage /> },
          {
            path: "/dashboard/post",
            element: <OrdersPage />,
          },
          {
            path: "/dashboard/delete",
            element: <DeleteCategory />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
