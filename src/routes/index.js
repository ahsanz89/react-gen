import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from '../components';
import { useRoutes } from '../hooks';
import { routes as ROUTES } from '../data/constant';



function Routes() {
  const routes = useRoutes(ROUTES.GET_ROUTES)
  if (routes.length === 0) {
    return <Loader />
  }
  const router = createBrowserRouter(routes); 
  return (
    <RouterProvider router={router} />
  );
}
export default Routes;
