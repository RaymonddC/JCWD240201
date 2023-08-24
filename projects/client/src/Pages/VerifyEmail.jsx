import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userVerification } from '../API/authAPI';
import { MdOutlineCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const verifiedAccount = async () => {
    try {
      let token = searchParams.get('token');
      const result = await userVerification(token);
      if (result.data.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message)
    }
  };

  useEffect(() => {
    verifiedAccount();
  }, []);
  return (
    <>
      {isSuccess ? (
        <div className="flex content-center justify-center bg-secondary p-12 w-full h-screen">
          <div className="flex content-center justify-center bg-white p-3 w-full rounded-lg">
            <div className="flex content-center justify-center flex-col gap-5">
              <div className="flex content-center justify-center">
                <div className="flex content-center justify-center rounded-full bg-slate-200 w-fit h-fit">
                  <MdOutlineCheck size={100} />
                </div>
              </div>
              <div className="flex content-center justify-center font-bold text-3xl">
                Verified!
              </div>
              <div className="flex content-center justify-center text-center font-semibold text-xl text-slate-500">
                You have successfully verified account.
              </div>
              <div className="flex content-center justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-primary w-4/12 text-white"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex content-center justify-center bg-secondary p-12 w-full h-screen">
          <div className="flex content-center justify-center bg-white p-3 w-full rounded-lg">
            <div className="flex content-center justify-center flex-col gap-5">
              <div className="flex content-center justify-center">
                <div className="flex content-center justify-center rounded-full bg-slate-200 w-fit h-fit">
                  <RxCross2 size={100} />
                </div>
              </div>
              <div className="flex content-center justify-center font-bold text-3xl">
                Error!
              </div>
              <div className="flex content-center justify-center text-center font-semibold text-xl text-slate-500">
                {errorMessage}
              </div>
              <div className="flex content-center justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-primary w-4/12 text-white"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
