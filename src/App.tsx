import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/AuthProvider';
import Home from './pages/home/Home';
import Auth from './layouts/auth/Auth';
import Login, {action as actionLogin} from './pages/authentication/login/Login';
import Register, {action as actionRegister} from './pages/authentication/register/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/authentication',
      element: <Auth />,
      action:actionLogin,
      children: [
        { index:true, element: <Login /> },
        { path:'register', element: <Register />, action:actionRegister }
      ]
    },
  ])
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
