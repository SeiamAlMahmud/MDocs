import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast"
import './index.css'
import Root from './Foundation/Root.jsx';
import ErrorPage from './Foundation/ErrorPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import Authentication from './Pages/Authentication/Authentication.jsx';
import Login from './Pages/Authentication/Login.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <Authentication />
      },
      {
        path: "/login",
        element: <Login />
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
  <RouterProvider router={router} />
  </StrictMode>,
)
