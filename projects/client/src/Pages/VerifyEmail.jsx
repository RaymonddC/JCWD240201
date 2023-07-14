import defaultTheme from '../utils/theme';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userVerification } from '../API/auth';

// TODO remove, this demo shouldn't need to reset the theme.

const theme = defaultTheme;

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const verifiedAccount = async () => {
    try {
      let token = searchParams.get('token');
      await userVerification(token);
    } catch (error) {}
  };

  useEffect(() => {
    verifiedAccount();
  }, []);
  return (
    <>
    
    </>
  );
}
