import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import VerifyEmail from './Pages/VerifyEmail';

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
        <Route path="/verification" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}

export default App;
