import './App.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { keepLoginAsync } from './Features/User/UserSlice';
import AdminRoute from './utils/routes/adminRoute';
import PublicRoute from './utils/routes/publicRoutes';
import Footer from './Components/Layout/Footer';
import { useLocation } from 'react-router-dom';
import getScrollbarWidth from './Helper/getScrollbarWidth';
import useBodyScrollable from './Helper/useBodyScrollable';
import { Sidebar } from './Components/Layout/Sidebar';
import NavbarAdmin from './Components/Layout/NavbarAdmin';
import NavbarDrawer from './Components/Layout/NavbarDrawer';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;
  const [navbar, setNavbar] = useState(false);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
