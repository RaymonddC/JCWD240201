import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Login } from './Pages/Login/Login';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // (async () => {
    //   const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/greetings`
    //   );
    //   setMessage(data?.message || "");
    // })();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
