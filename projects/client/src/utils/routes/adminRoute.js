import { useRoutes } from 'react-router-dom';
import React from 'react';
import { Dashboard } from '../../Pages/Dashboard';
import { AdminLayout } from '../../Components/Layout/AdminLayout';
import QnAAdmin from '../../Pages/QnAAdmin';
import QuestionDetails from '../../Pages/QuestionDetails';
import ProductListAdmin from '../../Pages/ProductListAdmin';

const AdminRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

const routerSource = (props) => [
  {
    index: true,
    path: '/',
    element: (
      <AdminLayout>
        <Dashboard />,
      </AdminLayout>
    ),
  },
  {
    index: true,
    path: '/qna',
    element: (
      <AdminLayout>
        <QnAAdmin />,
      </AdminLayout>
    ),
  },
  {
    index: true,
    path: '/qna/details/:id',
    element: (
      <AdminLayout>
        <QuestionDetails />,
      </AdminLayout>
    ),
  },
  {
    index: true,
    path: '/products',
    element: (
      <AdminLayout>
        <ProductListAdmin />,
      </AdminLayout>
    ),
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

export default AdminRoute;
