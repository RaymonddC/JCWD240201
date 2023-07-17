import { useRef } from 'react';
import { useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { sendResetForm } from '../API/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function ReqResetPassword() {
  const _email = useRef();
  const [emailValidation, setEmailValidation] = useState(true);
  const [disable, setDisable] = useState(false);

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
  const onSendRequest = async () => {
    try {
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
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex gap-4 border-b-2 h-14 p-3">
        <div className="flex items-center">
          <MdKeyboardBackspace size={25} />
        </div>
        <div className="flex items-center font-semibold">
          Request Reset Password
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
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
        {disable ? (
          <button
            onClick={() => onSendRequest()}
            className="btn btn-accent w-full text-white"
            disabled
          >
            Send Request
          </button>
        ) : (
          <button
            onClick={() => onSendRequest()}
            className="btn btn-accent w-full text-white"
          >
            Send Request
          </button>
        )}
      </div>
    </>
  );
}
