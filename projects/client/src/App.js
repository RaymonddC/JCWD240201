// import axios from 'axios';
// import { useEffect, useState } from 'react';
import './App.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import { keepLoginAsync } from './Features/User/UserSlice';
import AdminRoute from './utils/routes/adminRoute';
import PublicRoute from './utils/routes/publicRoutes';
import NavBar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import { useLocation } from 'react-router-dom';
import getScrollbarWidth from './Helper/getScrollbarWidth';
import useBodyScrollable from './Helper/useBodyScrollable';
import { PublicLayout } from './Components/Layout/PublicLayout';
import { Sidebar } from './Components/Layout/Sidebar';
import NavbarAdmin from './Components/Layout/NavbarAdmin';
import NavbarDrawer from './Components/Layout/NavbarDrawer';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const pathname = location.pathname;
  const [navbar, setNavbar] = useState(false);
  const [footer, setFooter] = useState(false);
  const bodyScrollable = useBodyScrollable();
  const scrollbarWidth = getScrollbarWidth();

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  // useLayoutEffect(() => {
  //   if (bodyScrollable) {
  //     document.body.style.paddingRight = '0px';
  //   } else {
  //     document.body.style.paddingRight = `${scrollbarWidth}px`;
  //   }
  // }, [bodyScrollable]);

  //PaymentGateway
  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY || '';
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (
      pathname === '/login' ||
      pathname === '/register' ||
      pathname === '/verification'
    ) {
      setNavbar(false);
      setFooter(false);
    } else {
      setNavbar(true);
      setFooter(true);
    }
    dispatch(keepLoginAsync());
  }, [pathname]);

  return (
    <>
      <div className="min-h-[100vh] flex flex-col">
        <Toaster />
        {user.role?.role_name === 'admin' ? (
          <div className="flex flex-col lg:flex-row">
            <Sidebar />
            <NavbarAdmin />
            <div className="lg:ml-[250px] ml-0 grow lg:flex flex-col h-full w-full lg:grow lg:w-[50vw] ">
              <div className="bg-gradient-to-b from-[#f8f6f6] from-10% via-[#f9f9f9] via-90% to-[#ebebeb] min-h-[100vh] px-5 pt-5 pb-20">
                <AdminRoute />
              </div>
            </div>
          </div>
        ) : (
          <>
            {navbar ? (
              <>
                <NavbarDrawer />
                <div className="relative md:px-[3em] md:py-[2em] flex-grow">
                  <PublicRoute />
                </div>
              </>
            ) : (
              <PublicRoute />
            )}
            {footer ? (
              <div className="hidden md:block">
                <Footer />
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
