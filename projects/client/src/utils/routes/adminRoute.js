import { useRoutes } from 'react-router-dom';
import React from 'react';
import { Dashboard } from '../../Pages/Dashboard';
import QnAAdmin from '../../Pages/QnAAdmin';
import QuestionDetails from '../../Pages/QuestionDetails';
import ProductListAdmin from '../../Pages/ProductListAdmin';
import CategoryAdmin from '../../Pages/CategoryAdmin';
import AddProduct from '../../Pages/AddProduct';
import EditProduct from '../../Pages/EditProduct';
import StockPageAdmin from '../../Pages/StockPageAdmin';
import PrescriptionAdmin from '../../Pages/PrescriptionAdmin';
import AddPromotion from '../../Pages/AddPromotion';
import TransactionAdmin from '../../Pages/TransactionAdmin';
import PrescriptionCopyAdmin from '../../Pages/PrescriptionCopyAdmin';
import ReportPage from '../../Components/Report/ReportPage';
import StockHistory from '../../Pages/StockHistory';
import SalesReport from '../../Pages/SalesReport';
import PromotionPage from '../../Pages/PromotionPageAdmin';

const AdminRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

const routerSource = (props) => [
  {
    index: true,
    path: '/',
    // element: <SalesReport />,
    element: <Dashboard />,
  },
  {
    index: true,
    path: '/discussions',
    element: <QnAAdmin />,
  },
  {
    index: true,
    path: '/discussions/details/:id',
    element: <QuestionDetails />,
  },
  {
    index: true,
    path: '/products',
    element: <ProductListAdmin />,
  },
  {
    index: true,
    path: '/categories',
    element: <CategoryAdmin />,
  },
  {
    index: true,
    path: '/products/new',
    element: <AddProduct />,
  },
  {
    index: true,
    path: '/products/edit/admin',
    element: <EditProduct />,
  },
  {
    index: true,
    path: '/stocks',
    element: <StockPageAdmin />,
  },
  {
    index: true,
    path: '/prescription',
    element: <PrescriptionAdmin />,
  },
  {
    index: true,
    path: '/promotions/new',
    element: <AddPromotion />,
  },
  {
    index: true,
    path: '/transactions',
    element: <TransactionAdmin />,
  },
  {
    index: true,
    path: '/prescription/:id',
    element: <PrescriptionCopyAdmin />,
  },
  {
    index: true,
    path: '/report',
    element: <ReportPage />,
  },
  {
    index: true,
    path: '/report/stock_history',
    element: <StockHistory />,
  },
  {
    index: true,
    path: '/promotions',
    element: <PromotionPage />,
  },
  {
    index: true,
    path: '/sales_report',
    element: <SalesReport />,
  },

  { index: true, path: '/*', element: <>ERROR</> },
];

export default AdminRoute;
