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

const routerSource = (props) => [
  {
    index: true,
    path: '/',
    element: <Landing {...props} />,
  },
  {
    index: true,
    path: '/user/profile',
    element: <Profile {...props} />,
  },
  {
    index: true,
    path: '/login',
    element: <Login {...props} />,
  },
  {
    index: true,
    path: '/register',
    element: <Login {...props} />,
  },
  {
    index: true,
    path: '/qna',
    element: <QnAUser {...props} />,
  },
  {
    index: true,
    path: '/verification',
    element: <VerifyEmail {...props} />,
  },
  {
    index: true,
    path: '/resetPassword',
    element: <ReqResetPassword {...props} />,
  },
  {
    index: true,
    path: '/resetPasswordForm',
    element: <ResetPasswordForm {...props} />,
  },
  {
    index: true,
    path: '/resetPasswordForm',
    element: <ResetPasswordForm {...props} />,
  },
  {
    index: true,
    path: '/qna/details',
    element: <QuestionDetails />,
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

const PublicRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

export default PublicRoute;
