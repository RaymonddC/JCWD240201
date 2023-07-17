// import axios from 'axios';
// import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import VerifyEmail from './Pages/VerifyEmail';
import Landing from './Pages/Landing';
import QnA from './Pages/QnA';
import ReqResetPassword from './Pages/ReqResetPassword';
import ResetPasswordForm from './Pages/ResetPasswordForm';

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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/verification" element={<VerifyEmail />} />
        <Route path="/resetPassword" element={<ReqResetPassword />} />
        <Route path="/resetPasswordForm" element={<ResetPasswordForm />} />
      </Routes>
    </>
  );
}

export default App;
