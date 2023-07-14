import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import VerifyEmail from './Pages/VerifyEmail';

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
        <Route path="/verification" element={<VerifyEmail />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
