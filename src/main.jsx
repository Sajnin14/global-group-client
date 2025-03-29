import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home.jsx';
import Registration from './auth/registration.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import Login from './auth/login.jsx';
import Users from './Components/Users/Users.jsx';
import UpdateUsers from './Components/Users/UpdateUsers.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Users></Users>
      },
      {
        path: '/users/:id',
        element: <UpdateUsers></UpdateUsers>,
        loader: ({params}) => fetch(`http://localhost:5000/api/login/${params.id}`)
      },
      {
        path: '/registration',
        element: <Registration></Registration>
      },
      {
        path: '/login',
        element: <Login></Login>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
