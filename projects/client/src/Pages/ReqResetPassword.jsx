import { useRef } from 'react';
import { useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { sendResetForm } from '../API/authAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ReqResetPassword() {
  const _email = useRef();
  const [emailValidation, setEmailValidation] = useState(true);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  //email validation
  const onEmail = (email) => {
    const isEmail = new RegExp(/\S+@\S+.\S+/);
    if (isEmail.test(email)) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  };

  //send reset password form
  const onSendRequest = async (e) => {
    try {
      e.preventDefault();
      setDisable(true);
      const result = await sendResetForm(_email.current.value);
      const errorMessage = { message: result.data?.message };

      if (result.data?.success) {
        toast.success(result.data?.message);
      } else {
        throw errorMessage;
      }
      _email.current.value = '';
      setDisable(false);
    } catch (error) {
      setDisable(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex gap-4 border-b-2 h-14 p-3">
        <div
          onClick={() => navigate('/login')}
          className="flex items-center hover:cursor-pointer"
        >
          <MdKeyboardBackspace size={25} />
        </div>
        <div className="flex items-center font-semibold">
          Request Reset Password
        </div>
      </div>
      <form onSubmit={onSendRequest}>
        <div className="lg:flex lg:justify-center lg:py-12 md:flex md:justify-center md:py-12">
          <div className="flex flex-col gap-4 p-4 lg:w-full lg:max-w-lg md:w-full md:max-w-lg">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Enter your email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className={
                  emailValidation
                    ? 'input input-bordered w-full'
                    : 'input input-bordered input-error w-full'
                }
                ref={_email}
                onChange={() => onEmail(_email.current.value)}
              />
              {emailValidation ? null : (
                <div className="label-text">Invalid email</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white"
              disabled={disable ? true : false}
            >
              Send Request
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
