import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userVerification } from '../API/auth';

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
