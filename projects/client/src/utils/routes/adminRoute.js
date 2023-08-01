import { useRoutes } from 'react-router-dom';
import React from 'react';
import { Dashboard } from '../../Pages/Dashboard';
import { AdminLayout } from '../../Components/Layout/AdminLayout';
import QnAAdmin from '../../Pages/QnAAdmin';
import QuestionDetails from '../../Pages/QuestionDetails';
import ProductListAdmin from '../../Pages/ProductListAdmin';
import CategoryAdmin from '../../Pages/CategoryAdmin';
import AddProduct from '../../Pages/AddProduct';
import EditProduct from '../../Pages/EditProduct';
import StockPageAdmin from '../../Pages/StockPageAdmin';
import PrescriptionAdmin from '../../Pages/PrescriptionAdmin';

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
    path: '/discussions',
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
  {
    index: true,
    path: '/categories',
    element: (
      <AdminLayout>
        <CategoryAdmin />,
      </AdminLayout>
    ),
  },
  {
    index: true,
    path: '/products/new',
    element: (
      <AdminLayout>
        <AddProduct />,
      </AdminLayout>
    ),
  },
  {
    index: true,
    path: '/products/edit/admin',
    element: (
      <AdminLayout>
        <EditProduct />,
      </AdminLayout>
    ),
  },
  {
    index: true,
    path: '/stocks',
    element: (
      <AdminLayout>
        <StockPageAdmin />,
      </AdminLayout>
    ),
  },
  {
    index: true,
    path: '/prescription',
    element: (
      <AdminLayout>
        <PrescriptionAdmin />,
      </AdminLayout>
    ),
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

export default AdminRoute;
