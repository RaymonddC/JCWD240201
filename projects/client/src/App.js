// import axios from 'axios';
// import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import { Login } from './Pages/Login';
import { Toaster } from 'react-hot-toast';
import VerifyEmail from './Pages/VerifyEmail';
import Landing from './Pages/Landing';
import QnA from './Pages/QnA';

function App() {
  // const [message, setMessage] = useState('');

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
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/verification" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}

export default App;
