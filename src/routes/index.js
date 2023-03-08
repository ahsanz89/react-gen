import { Layout } from '../layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages';
import { useRoutes } from '../hooks';
import { routes as ROUTES } from '../data/constant';
 


function Routes() {
  const routes  = useRoutes(ROUTES.GET_ROUTES)
  console.log(routes)
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    children: routes,
  },
]);
  return (
    <RouterProvider router={router} />
  );
}

export default Routes;
