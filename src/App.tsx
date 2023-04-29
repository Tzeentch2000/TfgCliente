import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/AuthProvider';
import Home from './pages/home/Home';
import Auth from './layouts/auth/Auth';
import Login, {action as actionLogin} from './pages/authentication/login/Login';
import Register, {action as actionRegister} from './pages/authentication/register/Register';
import Header from './layouts/header/Header';
import Books from './pages/maintenance/books/Books';
import Categories from './pages/maintenance/categories/Categories';
import States from './pages/maintenance/states/States';
import History from './pages/history/History';
import Cart from './pages/Cart/Cart';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Header />,
      children: [
        { index:true, element: <Home /> },
        { path:'books', element: <Books /> },
        { path:'categories', element: <Categories /> },
        { path:'states', element: <States /> },
        { path:'history', element: <History /> },
        { path:'cart', element: <Cart /> },
      ]
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
