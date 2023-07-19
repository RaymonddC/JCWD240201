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

const routerSource = (props) => [
  {
    index: true,
    path: '/',
    element: <Landing />,
  },
  {
    index: true,
    path: '/user/profile',
    element: <Profile />,
  },
  {
    index: true,
    path: '/login',
    element: <Login />,
  },
  {
    index: true,
    path: '/register',
    element: <Login />,
  },
  {
    index: true,
    path: '/discussions',
    element: <QnAUser />,
  },
  {
    index: true,
    path: '/verification',
    element: <VerifyEmail />,
  },
  {
    index: true,
    path: '/resetPassword',
    element: <ReqResetPassword />,
  },
  {
    index: true,
    path: '/resetPasswordForm',
    element: <ResetPasswordForm />,
  },
  {
    index: true,
    path: '/discussions/details/:id',
    element: <QuestionDetails />,
  },
  {
    index: true,
    path: '/user/change-password',
    element: <ChangePassword />,
  },
  {
    index: true,
    path: '/user/address',
    element: <Address />,
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

const PublicRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

export default PublicRoute;
