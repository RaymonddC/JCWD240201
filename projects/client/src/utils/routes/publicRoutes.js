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
import ProductDetails from '../../Pages/ProductDetails';
import Transaction from '../../Pages/Transaction';
import ProfileLayout from '../../Components/Layout/ProfileLayout';
import Checkout from '../../Pages/Checkout';
import MapsPharmacy from '../../Pages/MapsPharmacy';
import ChangeEmailForm from '../../Pages/ChangeEmailForm';
import QuestionUser from '../../Pages/QuestionUser';
import Logo1 from '../../utils/images/medicore_icon.png';

const routerSource = (props) => [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/user/profile',
    element: (
      // <PublicLayout>
      <Profile />
      // </PublicLayout>
    ),
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
    element: (
      // <PublicLayout>
      <Address />
      // </PublicLayout>
    ),
  },

  {
    path: '/cart',
    element: (
      // <PublicLayout>
      <Cart />
      // </PublicLayout>
    ),
  },
  {
    path: '/checkout',
    element: (
      // <PublicLayout>
      <Checkout />
      // </PublicLayout>
    ),
  },
  {
    index: true,
    path: '/products',
    element: <Products />,
  },
  {
    index: true,
    path: '/products/:id',
    element: <ProductDetails />,
  },
  {
    path: '/user/transaction',
    element: (
      // <PublicLayout>
      <ProfileLayout>
        <Transaction />
      </ProfileLayout>

      // </PublicLayout>
    ),
  },
  {
    index: true,
    path: '/location',
    element: <MapsPharmacy />,
  },
  {
    index: true,
    path: '/change-email/:token_email',
    element: <ChangeEmailForm />,
  },
  {
    path: '/user/questions',
    element: (
      // <PublicLayout>
      <ProfileLayout>
        <QuestionUser />
      </ProfileLayout>

      // </PublicLayout>
    ),
  },

  {
    index: true,
    path: '/*',
    element: (
      <>
        <div className="flex flex-col">
          <div className='flex w-full justify-center'>
            <article className="prose">
              <h1 className="mx-5 text-center ">PAGE NOT FOUND</h1>
            </article>
          </div>
          <div className='flex w-full justify-center py-10'>
            <img className="px-2 h-20" src={Logo1} alt="" />
          </div>
        </div>
      </>
    ),
  },
];

const PublicRoute = (props) => {
  const routers = routerSource(props);
  let routes = useRoutes(routers);
  return routes;
};

export default PublicRoute;
