import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userVerification } from '../API/auth';
import { MdOutlineCheck } from 'react-icons/md';

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
      <div className='flex content-center justify-center bg-cyan-400 p-12 w-full h-screen'>
        <div className='flex content-center justify-center bg-white p-3 w-full rounded-lg'>
          <div className="flex content-center justify-center flex-col gap-5">
            <div className="flex content-center justify-center">
              <div className="flex content-center justify-center rounded-full bg-slate-200 w-fit h-fit">
                <MdOutlineCheck size={100} />
              </div>
            </div>
            <div className="flex content-center justify-center font-bold text-3xl">Verified!</div>
            <div className="flex content-center justify-center text-center font-semibold text-xl text-slate-500">
              You have successfully verified account.
            </div>
            <div className="flex content-center justify-center">
              <button className="btn btn-accent w-fit text-white">Button</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
