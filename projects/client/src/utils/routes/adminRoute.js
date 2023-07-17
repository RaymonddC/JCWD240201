import { useRoutes } from 'react-router-dom';
import React from 'react';
import Landing from '../../Pages/Landing';
import { Dashboard } from '../../Pages/Dashboard';

const routerSource = (props) => [
  {
    index: true,
    path: '/',
    element: <Dashboard {...props} />,
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

const AdminRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

export default AdminRoute;
