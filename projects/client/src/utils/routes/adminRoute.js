import { useRoutes } from 'react-router-dom';
import React from 'react';
import Landing from '../../Pages/Landing';
import { Dashboard } from '../../Pages/Dashboard';
import { AdminLayout } from '../../Components/Layout/AdminLayout';

const routerSource = (props) => [
  {
    index: true,
    path: '/',
    element: (
      <AdminLayout>
        <Dashboard {...props} />,
      </AdminLayout>
    ),
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

const AdminRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

export default AdminRoute;
