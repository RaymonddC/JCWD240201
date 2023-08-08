// import axios from 'axios';
// import { useEffect, useState } from 'react';
import './App.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { keepLoginAsync } from './Features/User/UserSlice';
import AdminRoute from './utils/routes/adminRoute';
import PublicRoute from './utils/routes/publicRoutes';
import NavBar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import { useLocation } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const pathname = location.pathname;
  const [navbar, setNavbar] = useState(false);
  const [footer, setFooter] = useState(false);
  // console.log('location', location);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/discussions' ||
      pathname === '/profile' ||
      pathname === '/products'
    ) {
      setNavbar(true);
      setFooter(true);
    }
    dispatch(keepLoginAsync());
  }, [location]);

  return (
    <>
      <div className="">
        <Toaster />
        {user.role?.role_name === 'admin' ? (
          <AdminRoute />
        ) : (
          <>
            {navbar ? <NavBar /> : ''}
            <PublicRoute />
            {footer ? <Footer /> : ''}
          </>
        )}
      </div>
    </>
  );
}

export default App;
