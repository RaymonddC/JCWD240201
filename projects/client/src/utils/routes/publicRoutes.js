import { useRoutes } from 'react-router-dom';
import React from 'react';
import Landing from '../../Pages/Landing';
import Profile from '../../Pages/Profile';
import { Login } from '../../Pages/Login';
import QnAUser from '../../Pages/QnAUser';
import VerifyEmail from '../../Pages/VerifyEmail';
import ReqResetPassword from '../../Pages/ReqResetPassword';
import ResetPasswordForm from '../../Pages/ResetPasswordForm';
import QuestionDetails from '../../Pages/QuestionDetails';
import ChangePassword from '../../Pages/ChangePassword';
import Address from '../../Pages/Address';
import Cart from '../../Pages/Cart';
import { PublicLayout } from '../../Components/Layout/PublicLayout';
import Products from '../../Pages/Products';

const routerSource = (props) => [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/user/profile',
    element: <Profile />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Login />,
  },
  {
    path: '/discussions',
    element: <QnAUser />,
  },
  {
    path: '/verification',
    element: <VerifyEmail />,
  },
  {
    path: '/resetPassword',
    element: <ReqResetPassword />,
  },
  {
    path: '/resetPasswordForm',
    element: <ResetPasswordForm />,
  },
  {
    path: '/discussions/details/:id',
    element: <QuestionDetails />,
  },
  {
    path: '/user/change-password',
    element: <ChangePassword />,
  },
  {
    path: '/user/address',
    element: <Address />,
  },
  {
    path: '/cart',
    element: (
      <PublicLayout>
        <Cart />,
      </PublicLayout>
    ),
    index: true,
    path: '/products',
    element: <Products />,
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

const PublicRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

export default PublicRoute;
