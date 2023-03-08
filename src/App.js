import { useEffect } from 'react';
import './App.scss'; 
import axios from "axios"
import { Layout } from './layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard, ErrorPage, User } from './pages';


function App() {
  useEffect(()=>{
    async function fetchRoutesData() {
      const response = await axios.get('/routes/admin.json');
      return response.data;
    }

    fetchRoutesData()
  },[])


  const router = createBrowserRouter([  {
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
  return (
    <RouterProvider router={router} />

  );
}

export default App;
