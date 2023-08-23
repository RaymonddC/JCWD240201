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
  useEffect(() => {
    if (
      pathname === '/login' ||
      pathname === '/register'||
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
          <AdminRoute />
        ) : (
          <>
            {navbar ? (
              <>
                <NavBar />
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
