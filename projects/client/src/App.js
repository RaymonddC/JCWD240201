import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login } from './Pages/Login';
import LandingPage from './Pages/LandingPage';

function App() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
