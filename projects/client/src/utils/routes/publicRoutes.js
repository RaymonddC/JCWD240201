import { useRoutes } from 'react-router-dom';
import React from 'react';
import Landing from '../../Pages/Landing';
import Profile from '../../Pages/Profile';
import { Login } from '../../Pages/Login';
import QnA from '../../Pages/QnA';
import VerifyEmail from '../../Pages/VerifyEmail';

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
    element: <QnA {...props} />,
  },
  {
    index: true,
    path: '/verification',
    element: <VerifyEmail {...props} />,
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

const PublicRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

export default PublicRoute;
