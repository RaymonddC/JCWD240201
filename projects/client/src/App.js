// import axios from 'axios';
// import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile';
import VerifyEmail from './Pages/VerifyEmail';
import Landing from './Pages/Landing';
import QnA from './Pages/QnA';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RequestGetDataUser } from './Features/User/UserSlice';

function App() {
  const dispatch = useDispatch();
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  useEffect(() => {
    dispatch(RequestGetDataUser());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/" element={<Landing />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/verification" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}

export default App;
