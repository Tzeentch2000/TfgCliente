import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/AuthProvider';
import Home, {loader as homeLoader} from './pages/home/Home';
import Auth from './layouts/auth/Auth';
import Login, {action as actionLogin} from './pages/authentication/login/Login';
import Register, {action as actionRegister} from './pages/authentication/register/Register';
import Header from './layouts/header/Header';
import Books, {loader as booksLoader} from './pages/maintenance/books/Books';
import Categories, {loader as categoriesLoader} from './pages/maintenance/categories/Categories';
import States, {loader as statesLoader} from './pages/maintenance/states/States';
import History, {loader as historyLoader} from './pages/history/History';
import Cart from './pages/cart/Cart';
import BookDetails, {loader as bookDetailLoader} from './pages/bookDetails/BookDetails';
import { CartProvider } from './context/CartProvider';
import {action as shopAction} from './components/direction/Direction';
import Chart from './layouts/chart/Chart';
import LineChart, {loader as ordersLoader} from './pages/chart/line/LineChart';
import RadioChart from './pages/chart/radio/RadioChart';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Header />,
      children: [
        { index:true, element: <Home /> , loader: homeLoader},
        { path:'books', element: <Books />, loader: booksLoader },
        { path:'categories', element: <Categories />, loader: categoriesLoader },
        { path:'states', element: <States />, loader: statesLoader },
        { path: 'charts',
           element: <Chart />,
           children:[
            { index:true, element: <LineChart />, loader: ordersLoader,},
            { path:'radio', element: <RadioChart />},
           ]},
        { path:'history', element: <History />, loader: historyLoader },
        { path:'cart', element: <Cart />, action: shopAction },
        { path:'book/:bookId', element: <BookDetails />, loader: bookDetailLoader },
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
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
