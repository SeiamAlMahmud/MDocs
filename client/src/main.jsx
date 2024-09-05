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
import Authentication from './Pages/Authentication/Authentication.jsx';
import Login from './Pages/Authentication/Login.jsx';
import DocContext from './Context/DocContext.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import DocHomePage from './Pages/Docs/DocHomePage.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import CreateDoc from './Pages/Docs/CreateDoc.jsx';
import DemoDoc from './Pages/Docs/DemoDoc.jsx';
import ViewDoc from "./Pages/Docs/ViewDoc.jsx"



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
      },
      {
        path: "/doc",
        element: (
          <PrivateRoute>
            <DocHomePage />
          </PrivateRoute>
        )
      },
      {
        path: "/createdoc/:docsId",
        element: (
          <PrivateRoute>
            <CreateDoc />
          </PrivateRoute>
        )
      },
      {
        path: "/demoDoc",
        element: <DemoDoc />
      },

      {
        path: "/view/:docsId",
        element: <ViewDoc />
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DocContext>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </DocContext>
  </StrictMode>,
)
