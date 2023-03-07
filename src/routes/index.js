import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Dashboard, ErrorPage, User } from "../pages";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPage />,
      // loader: rootLoader,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <User />,
        },
      ],
    },
  ]);