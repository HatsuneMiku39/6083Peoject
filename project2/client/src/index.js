import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import CheckingPage from './pages/CheckingPage';
import CheckingUpdatePage from './pages/CheckingUpdatePage';
import SavingPage from './pages/SavingPage';
import SavingUpdatePage from './pages/SavingUpdatePage';
import LoanPage from './pages/LoanPage';
import LoanNewPage from './pages/LoanNewPage';
import ProfilePage from './pages/ProfilePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
    errorElement:<NotFoundPage />,
  },{
    path: '/MainPage',
    element: <MainPage />,
  },{
    path: '/Login',
    element: <LoginPage />,
  },{
    path: '/Register',
    element: <RegisterPage />,
  },{
    path: '/Profile',
    element: <UserProfilePage />,
  },{
    path: '/Checking',
    element: <CheckingPage />,
  },{
    path: '/CheckingUpdate',
    element: <CheckingUpdatePage />,
  },{
    path: '/Saving',
    element: <SavingPage />,
  },{
    path: '/SavingUpdate',
    element: <SavingUpdatePage />,
  },{
    path: '/Loan',
    element: <LoanPage />,
  },{
    path: "/NewLoan",
    element: <LoanNewPage />,
  },{
    path: "/ProfileUpdate",
    element: <ProfilePage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
